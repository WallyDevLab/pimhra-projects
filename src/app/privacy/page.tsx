import type { Metadata } from "next";
import { site } from "@/content/site";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects and uses personal information, under the Protection of Personal Information Act (POPIA).`,
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <>
      <PageHero title="Privacy policy" intro="How we handle your personal information under POPIA." crumbs={[{ label: "Privacy policy" }]} />
      <section className="section">
        <div className="wrap prose">
          <p className="notice" role="note">Draft for legal review. Confirm the responsible party details, Information Officer and retention periods with {site.name} before launch.</p>
          <h2>Who we are</h2>
          <p>{site.name} is the responsible party for personal information collected on this website. You can contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or on {site.phoneDisplay}.</p>
          <h2>What we collect</h2>
          <p>When you send a quote request we collect your name, phone number, email address, location and the details you give us about the work. We collect only what we need to respond to you.</p>
          <h2>Why we collect it</h2>
          <ul>
            <li>To reply to your quote request and arrange a site visit.</li>
            <li>To prepare and send you a quote.</li>
            <li>To keep records of enquiries and the work we carry out.</li>
          </ul>
          <p>We do this with your consent, which you give by ticking the box on the form, and so we can respond to a request you made.</p>
          <h2>Who sees it</h2>
          <p>Your request is emailed to our team. It is processed by service providers that host this website and deliver email on our behalf. We do not sell your information.</p>
          <h2>Cookies and analytics</h2>
          <p>This website does not use advertising or tracking cookies. We use privacy friendly analytics that does not set cookies, to count visits and button taps such as WhatsApp and call. Your light or dark mode choice is stored in your browser only.</p>
          <h2>How long we keep it</h2>
          <p>We keep enquiry details for as long as needed to deal with your request and our business records, and then delete or anonymise them.</p>
          <h2>Your rights</h2>
          <p>You may ask to see, correct or delete the information we hold about you, and withdraw your consent at any time, by emailing <a href={`mailto:${site.email}`}>{site.email}</a>. You may also complain to the Information Regulator of South Africa.</p>
        </div>
      </section>
    </>
  );
}
