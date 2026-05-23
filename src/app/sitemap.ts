import type { MetadataRoute } from "next";

const BASE_URL = "https://akvaithi.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${BASE_URL}/`,             lastModified, changeFrequency: "monthly",  priority: 1.0 },
    { url: `${BASE_URL}/professional`, lastModified, changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE_URL}/creative`,     lastModified, changeFrequency: "weekly",   priority: 0.9 },
    { url: `${BASE_URL}/contact`,      lastModified, changeFrequency: "yearly",   priority: 0.7 },
  ];
}
