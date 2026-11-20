import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/site";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Building services in Johannesburg",
  description: "Renovations, painting, roofing, tiling, plumbing and maintenance contracts for commercial and residential property in Johannesburg.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <PageHero title="Services" intro="Pick the work you need. Each service has its own page and you can request a quote from any of them." crumbs={[{ label: "Services" }]} />
      <section className="section">
        <div className="wrap grid cols-3">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card">
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <span className="more">Learn more</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
