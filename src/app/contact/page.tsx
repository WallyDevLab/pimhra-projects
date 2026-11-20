import type { Metadata } from "next";
import { Suspense } from "react";
import { replyPromise, site, whatsappLink } from "@/content/site";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import TrackedLink from "@/components/TrackedLink";
import { ChatIcon, PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Request a free quote",
  description: `Request a free quote from ${site.name}. Call, WhatsApp or send the form.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero title="Request a free quote" intro={replyPromise ?? "Tell us about your building and we will get back to you."} crumbs={[{ label: "Contact" }]} />
      <section className="section">
        <div className="wrap contact-grid">
          <div>
            <Suspense fallback={null}><QuoteForm /></Suspense>
          </div>
          <aside aria-label="Contact details">
            <h2>Prefer to talk?</h2>
            <ul className="contact-list">
              <li><TrackedLink href={`tel:${site.phoneTel}`} event="call_tap" place="contact"><PhoneIcon /> {site.phoneDisplay}</TrackedLink></li>
              <li><TrackedLink href={whatsappLink()} event="whatsapp_tap" place="contact"><ChatIcon /> WhatsApp us</TrackedLink></li>
              <li><TrackedLink href={`mailto:${site.email}`} event="email_tap" place="contact">{site.email}</TrackedLink></li>
              <li>{site.hours}</li>
            </ul>
            <h2>Areas we serve</h2>
            <ul className="chips">{site.serviceAreas.map((a) => <li key={a}>{a}</li>)}</ul>
            <h2 style={{ marginTop: "2rem" }}>Map</h2>
            <iframe className="map" title="Map of our service area around Johannesburg" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Johannesburg&output=embed" />
          </aside>
        </div>
      </section>
    </>
  );
}
