import Link from "next/link";
import type { Project } from "@/content/site";
import PhotoPlaceholder from "./PhotoPlaceholder";

export const statusLabel = (s: Project["status"]) =>
  s === "sample" ? "Sample project" : s === "pending" ? "Awaiting client permission" : null;

export default function ProjectCard({ p }: { p: Project }) {
  const label = statusLabel(p.status);
  return (
    <Link href={`/projects/${p.slug}`} className="card">
      <PhotoPlaceholder label={p.title} />
      {label && <span className="badge">{label}</span>}
      <h3>{p.title}</h3>
      <p>{p.location}. {p.scope}</p>
      <span className="more">View project</span>
    </Link>
  );
}
