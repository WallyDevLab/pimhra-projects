import type { MetadataRoute } from "next";
import { projects, services, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/projects", "/about", "/process", "/contact", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, priority: 0.8 })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, priority: 0.6 })),
  ];
}
