import type { Metadata } from "next";
import { site } from "@/content/site";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `Terms for using the ${site.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <>
      <PageHero title="Terms of use" crumbs={[{ label: "Terms of use" }]} />
      <section className="section">
        <div className="wrap prose">
          <p className="notice" role="note">Draft for legal review before launch.</p>
          <h2>Information on this website</h2>
          <p>We take care to keep this website accurate, but it is general information and not a quote or an offer. Prices, timing and scope are confirmed only in a written quote.</p>
          <h2>Project photos and content</h2>
          <p>Project photographs and descriptions belong to {site.name} or are used with permission. Please do not copy them without asking.</p>
          <h2>Links to other websites</h2>
          <p>Links to services such as WhatsApp and Google Maps are provided for convenience. Those services have their own terms and privacy policies.</p>
          <h2>Contact</h2>
          <p>Questions about these terms can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        </div>
      </section>
    </>
  );
}
