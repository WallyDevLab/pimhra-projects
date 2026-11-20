import Link from "next/link";
import type { ReactNode } from "react";

export default function PageHero({ title, intro, crumbs }: { title: string; intro?: ReactNode; crumbs?: { href?: string; label: string }[] }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        {crumbs && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label}> / {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}</span>
            ))}
          </nav>
        )}
        <hr className="rule" />
        <h1>{title}</h1>
        {intro && <p className="lead">{intro}</p>}
      </div>
    </section>
  );
}
