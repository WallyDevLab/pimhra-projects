"use client";

import { site, whatsappLink } from "@/content/site";
import TrackedLink from "./TrackedLink";
import { ChatIcon, PhoneIcon } from "./Icons";

/** Fixed WhatsApp and call bar on every page, mobile only (hidden from 62rem up). */
export default function FloatingActions() {
  return (
    <div className="float" role="group" aria-label="Contact us quickly">
      <TrackedLink href={whatsappLink()} className="wa" event="whatsapp_tap" place="floating"><ChatIcon /> WhatsApp</TrackedLink>
      <TrackedLink href={`tel:${site.phoneTel}`} className="call" event="call_tap" place="floating"><PhoneIcon /> Call</TrackedLink>
    </div>
  );
}
