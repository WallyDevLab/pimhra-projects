import Link from "next/link";
import { credentials, projects, services, site, testimonials, processSteps, whatsappLink } from "@/content/site";
import TrackedLink from "@/components/TrackedLink";
import CtaBand from "@/components/CtaBand";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const trust = credentials.filter((c) => c.confirmed);
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">{site.region}</p>
            <h1>{site.tagline}</h1>
            <p className="lead">{site.description}</p>
            <div className="btn-row">
              <TrackedLink href="/contact" className="btn btn-primary" event="quote_cta_tap" place="hero">Get a free quote</TrackedLink>
              <TrackedLink href={whatsappLink()} className="btn btn-secondary" event="whatsapp_tap" place="hero">WhatsApp us</TrackedLink>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <svg viewBox="0 0 320 260" width="100%">
              <rect x="20" y="40" width="280" height="190" rx="10" fill="none" stroke="#D4A017" strokeWidth="3" />
              <path d="M20 90h280M110 40v190M200 90v140" stroke="#D4A017" strokeWidth="2" opacity="0.5" />
              <path d="M60 230V150h40v80M230 230V120h40v110" fill="none" stroke="#F4F1E8" strokeWidth="3" />
              <circle cx="262" cy="64" r="12" fill="#D4A017" />
            </svg>
          </div>
        </div>
      </section>

      {trust.length > 0 && (
        <div className="trust">
          <div className="wrap">
            <ul aria-label="Credentials">{trust.map((c) => <li key={c.label}>{c.label}</li>)}</ul>
          </div>
        </div>
      )}

      <section className="section" aria-labelledby="services-h">
        <div className="wrap">
          <p className="eyebrow">What we do</p>
          <h2 id="services-h">Services for owners, managers and businesses</h2>
          <div className="grid cols-3" style={{ marginTop: "1.5rem" }}>
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card">
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="more">Learn more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="projects-h">
        <div className="wrap">
          <p className="eyebrow">Our work</p>
          <h2 id="projects-h">Featured projects</h2>
          <div className="grid cols-3" style={{ marginTop: "1.5rem" }}>
            {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
          <div className="btn-row"><Link className="btn btn-secondary" href="/projects">See all projects</Link></div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-h">
        <div className="wrap">
          <p className="eyebrow">How we work</p>
          <h2 id="process-h">Four steps, no surprises</h2>
          <ol className="steps" style={{ marginTop: "1.5rem" }}>
            {processSteps.map((s) => (
              <li key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section alt" aria-labelledby="t-h">
          <div className="wrap">
            <h2 id="t-h">What clients say</h2>
            <div className="grid cols-3">
              {testimonials.map((t) => (
                <figure key={t.name} className="card" style={{ margin: 0 }}>
                  <blockquote style={{ margin: 0 }}>{t.quote}</blockquote>
                  <figcaption style={{ marginTop: "1rem", fontWeight: 700 }}>{t.name}, {t.role}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
