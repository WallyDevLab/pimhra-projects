import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, services } from "@/content/site";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { statusLabel } from "@/components/ProjectCard";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.title}, ${p.location}`, description: p.summary, alternates: { canonical: `/projects/${p.slug}` } };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const label = statusLabel(p.status);
  const related = services.filter((s) => p.serviceSlugs.includes(s.slug));

  return (
    <>
      <PageHero title={p.title} intro={p.summary} crumbs={[{ href: "/projects", label: "Projects" }, { label: p.title }]} />
      <section className="section">
        <div className="wrap">
          {label && <span className="badge">{label}</span>}
          <dl className="facts">
            <div><dt>Location</dt><dd>{p.location}</dd></div>
            <div><dt>Client type</dt><dd>{p.clientType}</dd></div>
            <div><dt>Duration</dt><dd>{p.duration}</dd></div>
            <div><dt>Scope of work</dt><dd>{p.scope}</dd></div>
          </dl>
          <h2>Before and after</h2>
          <div className="ba">
            <figure><PhotoPlaceholder label={`${p.title}, before`} /><figcaption>Before</figcaption></figure>
            <figure><PhotoPlaceholder label={`${p.title}, after`} /><figcaption>After</figcaption></figure>
          </div>
          <div className="prose">
            <h2>Outcome</h2>
            <p>{p.outcome}</p>
            <p>Services used: {related.map((s, i) => (<span key={s.slug}>{i > 0 && ", "}<Link href={`/services/${s.slug}`}>{s.title}</Link></span>))}</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
