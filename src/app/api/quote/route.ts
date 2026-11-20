import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/quote";
import { site } from "@/content/site";

export const runtime = "nodejs";

// Simple in memory limiter. On Vercel each instance has its own memory, so this only slows
// casual abuse. Move to Upstash Redis (or Vercel KV) for real production rate limiting.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_HITS;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured, honeypot and time check still apply
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (Number(req.headers.get("content-length") ?? 0) > 20_000) {
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again in a few minutes or use WhatsApp." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) fields[String(issue.path[0])] ??= issue.message;
    // A filled honeypot is a bot. Pretend success so it learns nothing.
    if ((body as { website?: string })?.website) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fields }, { status: 400 });
  }
  const q = parsed.data;

  // Humans take more than a few seconds to fill the form.
  if (q.startedAt && Date.now() - q.startedAt < 3000) return NextResponse.json({ ok: true });

  if (!(await verifyTurnstile(q.turnstile, ip))) {
    return NextResponse.json({ ok: false, error: "Spam check failed. Please refresh and try again." }, { status: 400 });
  }

  const subject = `New quote request: ${q.service} (${q.location})`;
  const text = [
    `Name: ${q.name}`,
    `Phone: ${q.phone}`,
    `Email: ${q.email}`,
    `Service: ${q.service}`,
    `Location: ${q.location}`,
    "",
    q.message,
    "",
    "Consent to be contacted under the privacy policy: yes",
  ].join("\n");
  const html = `<h2>${esc(subject)}</h2><table cellpadding="6">
    <tr><td><b>Name</b></td><td>${esc(q.name)}</td></tr>
    <tr><td><b>Phone</b></td><td>${esc(q.phone)}</td></tr>
    <tr><td><b>Email</b></td><td>${esc(q.email)}</td></tr>
    <tr><td><b>Service</b></td><td>${esc(q.service)}</td></tr>
    <tr><td><b>Location</b></td><td>${esc(q.location)}</td></tr></table>
    <p style="white-space:pre-wrap">${esc(q.message)}</p>`;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL ?? site.email;

  if (!key) {
    if (process.env.NODE_ENV === "production") {
      // Never silently lose a lead in production.
      console.error("QUOTE_NOT_DELIVERED: RESEND_API_KEY is not set", subject);
      return NextResponse.json({ ok: false, error: "We could not send your request. Please use WhatsApp or call us." }, { status: 503 });
    }
    console.log("[dev] quote request\n" + text);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL ?? `${site.name} Website <onboarding@resend.dev>`,
        to: [to],
        reply_to: q.email,
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Log the full request so the lead can be recovered from the logs.
    console.error("QUOTE_NOT_DELIVERED", err, JSON.stringify({ ...q, website: undefined }));
    return NextResponse.json({ ok: false, error: "We could not send your request. Please use WhatsApp or call us." }, { status: 502 });
  }
}
