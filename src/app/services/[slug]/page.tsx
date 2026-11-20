import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, services, site, whatsappLink } from "@/content/site";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import TrackedLink from "@/components/TrackedLink";
import ProjectCard from "@/components/ProjectCard";
import JsonLd from "@/components/JsonLd";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.title} in Johannesburg`,
    description: `${s.description} Request a free quote from ${site.name}.`,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const related = projects.filter((p) => p.serviceSlugs.includes(s.slug));
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.description, provider: { "@type": "HomeAndConstructionBusiness", name: site.name }, areaServed: "Johannesburg" }} />
      <PageHero title={s.title} intro={s.description} crumbs={[{ href: "/services", label: "Services" }, { label: s.title }]} />
      <section className="section">
        <div className="wrap prose">
          <h2>What is included</h2>
          <ul className="tick-list">{s.includes.map((i) => <li key={i}>{i}</li>)}</ul>
          <p>Tell us about the property and what needs doing. We visit, give you a written quote and agree the timing before any work starts.</p>
          <div className="btn-row">
            <TrackedLink href={`/contact?service=${encodeURIComponent(s.title)}`} className="btn btn-primary" event="quote_cta_tap" place={`service:${s.slug}`}>Get a free quote for {s.title.toLowerCase()}</TrackedLink>
            <TrackedLink href={whatsappLink(`Hello, I would like a quote for ${s.title.toLowerCase()}.`)} className="btn btn-secondary" event="whatsapp_tap" place={`service:${s.slug}`}>WhatsApp us</TrackedLink>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section alt">
          <div className="wrap">
            <h2>Related projects</h2>
            <div className="grid cols-3">{related.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
          </div>
        </section>
      )}
      <section className="section">
        <div className="wrap">
          <h2>Other services</h2>
          <ul className="chips">{others.map((o) => <li key={o.slug}><Link href={`/services/${o.slug}`}>{o.title}</Link></li>)}</ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
