import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Lists every public route so search engines can discover and index them.
// Served automatically at /sitemap.xml.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/new-patients", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/reviews", priority: 0.7 },
    { path: "/about-us", priority: 0.7 },
    { path: "/contact-us", priority: 0.8 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
