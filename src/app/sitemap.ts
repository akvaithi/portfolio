import type { MetadataRoute } from "next";

const BASE_URL = "https://akvaithi.page";

// `new Date()` here would stamp every page with the build time, so a redeploy
// that only touched CSS would tell Google all four pages changed. Crawlers
// discount lastmod they catch lying. Bump these by hand when the copy on that
// page actually changes.
const LAST_CONTENT_CHANGE = "2026-05-24";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = LAST_CONTENT_CHANGE;
  // URLs must match the canonical tags byte for byte — no trailing slash,
  // since that's what `alternates.canonical` resolves to and what the
  // trailing-slash redirect lands on.
  return [
    { url: BASE_URL,                   lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/professional`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/creative`,     lastModified, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/contact`,      lastModified, changeFrequency: "yearly",  priority: 0.7 },
  ];
}
