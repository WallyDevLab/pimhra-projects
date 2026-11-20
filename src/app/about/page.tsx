import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { credentials, site } from "@/content/site";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, a Johannesburg contractor for building renovation, repairs and maintenance.`,
  alternates: { canonical: "/about" },
};

export default function About() {
  const confirmed = credentials.filter((c) => c.confirmed);
  // The profile download appears only when the PDF has been added to /public.
  const hasProfile = fs.existsSync(path.join(process.cwd(), "public", "company-profile.pdf"));
  return (
    <>
      <PageHero title={`About ${site.name}`} intro={site.description} crumbs={[{ label: "About" }]} />
      <section className="section">
        <div className="wrap prose">
          <h2>Who we are</h2>
          <p>{site.name} carries out renovation, repair and maintenance work on commercial and residential property across {site.region}. This page will be completed with the company story, team and registration details once they are confirmed.</p>
          {confirmed.length > 0 && (
            <>
              <h2>Credentials</h2>
              <ul className="tick-list">{confirmed.map((c) => <li key={c.label}>{c.label}</li>)}</ul>
            </>
          )}
          {hasProfile && (
            <TrackedLink href="/company-profile.pdf" className="btn btn-secondary" event="profile_download" download>Download company profile (PDF)</TrackedLink>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
