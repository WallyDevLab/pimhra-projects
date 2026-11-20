"use client";

import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { quoteSchema, serviceOptions } from "@/lib/quote";
import { trackEvent } from "@/lib/analytics";
import { site, whatsappLink } from "@/content/site";

type Status = "idle" | "sending" | "success" | "error";

export default function QuoteForm() {
  const requested = useSearchParams().get("service") ?? "";
  const defaultService = serviceOptions.includes(requested) ? requested : undefined;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const started = useRef(false);
  const startedAt = useRef(Date.now());
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  function onFirstInteraction() {
    if (!started.current) {
      started.current = true;
      startedAt.current = Date.now();
      trackEvent("form_start");
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      service: String(fd.get("service") ?? ""),
      location: String(fd.get("location") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      startedAt: startedAt.current,
      turnstile: String(fd.get("cf-turnstile-response") ?? "") || undefined,
    };

    const check = quoteSchema.safeParse(data);
    if (!check.success) {
      const fields: Record<string, string> = {};
      for (const i of check.error.issues) fields[String(i.path[0])] ??= i.message;
      setErrors(fields);
      setStatus("error");
      setServerError("Please check the highlighted fields.");
      trackEvent("form_submit_error", { reason: "validation" });
      return;
    }

    setErrors({});
    setServerError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json()) as { ok: boolean; error?: string; fields?: Record<string, string> };
      if (json.ok) {
        setStatus("success");
        trackEvent("form_submit_success", { service: data.service });
        return;
      }
      setErrors(json.fields ?? {});
      setServerError(json.error ?? "Something went wrong.");
      setStatus("error");
      trackEvent("form_submit_error", { reason: String(res.status) });
    } catch {
      setServerError("Network problem. Please try again or use WhatsApp.");
      setStatus("error");
      trackEvent("form_submit_error", { reason: "network" });
    }
  }

  if (status === "success") {
    return (
      <div className="notice ok" role="status">
        <h3>Thank you, we have your request.</h3>
        <p>We will contact you on the phone number or email you gave us. If it is urgent, message us on WhatsApp.</p>
        <a className="btn btn-secondary" href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
      </div>
    );
  }

  const field = (name: string) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${name}-err` : undefined,
  });
  const err = (name: string) => errors[name] && <span className="error" id={`${name}-err`}>{errors[name]}</span>;

  return (
    <form className="form" onSubmit={onSubmit} onChange={onFirstInteraction} noValidate aria-label="Request a quote">
      {siteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />}
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input {...field("name")} autoComplete="name" required />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" required />
          {err("phone")}
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">Email address</label>
        <input {...field("email")} type="email" inputMode="email" autoComplete="email" required />
        {err("email")}
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="service">Service needed</label>
          <select {...field("service")} defaultValue={defaultService ?? ""} required>
            <option value="" disabled>Choose a service</option>
            {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {err("service")}
        </div>
        <div className="field">
          <label htmlFor="location">Suburb or address</label>
          <input {...field("location")} autoComplete="address-level2" required />
          {err("location")}
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Tell us about the work</label>
        <textarea {...field("message")} required />
        <span className="hint">Include the size of the building and when you want the work done. Photos can be sent on WhatsApp.</span>
        {err("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots fill it in */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {siteKey && <div className="cf-turnstile" data-sitekey={siteKey} data-appearance="interaction-only" />}

      <div className="field">
        <label className="consent" htmlFor="consent">
          <input {...field("consent")} type="checkbox" />
          <span>
            I agree that {site.name} may use my details to respond to this request, as described in the <Link href="/privacy">privacy policy</Link>.
          </span>
        </label>
        {err("consent")}
      </div>

      <div aria-live="polite">
        {status === "error" && serverError && <p className="notice bad" role="alert">{serverError}</p>}
      </div>

      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send my request"}
      </button>
    </form>
  );
}
