import { track } from "@vercel/analytics";

export type EventName =
  | "whatsapp_tap"
  | "call_tap"
  | "email_tap"
  | "quote_cta_tap"
  | "form_start"
  | "form_submit_success"
  | "form_submit_error"
  | "profile_download";

/** Cookieless custom events (Vercel Analytics). Never throws. */
export function trackEvent(name: EventName, props?: Record<string, string>) {
  try {
    track(name, props);
  } catch {
    /* analytics must never break the page */
  }
}
