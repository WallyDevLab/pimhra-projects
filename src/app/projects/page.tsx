import type { Metadata } from "next";
import { projects } from "@/content/site";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Renovation, painting and refurbishment projects completed by Pimhra Projects in Johannesburg.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  const hasUnconfirmed = projects.some((p) => p.status !== "approved");
  return (
    <>
      <PageHero title="Projects" intro="A look at the work, with before and after photos for each project." crumbs={[{ label: "Projects" }]} />
      <section className="section">
        <div className="wrap">
          {hasUnconfirmed && (
            <p className="notice" role="note">Preview note: projects marked as samples are placeholders and projects awaiting permission are not yet cleared for publishing. Remove this note and the badges when content is approved.</p>
          )}
          <div className="grid cols-3" style={{ marginTop: "1.5rem" }}>
            {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
