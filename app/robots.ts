import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Served automatically at /robots.txt — allows all crawlers and points them
// to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
