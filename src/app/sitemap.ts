import type { MetadataRoute } from "next";

const BASE = "https://operis.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: `${BASE}/`, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE}/shop`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/enterprise`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/support`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/support/faq`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/support/shipping`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${BASE}/support/return-policy`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${BASE}/support/order-tracking`, changeFrequency: "monthly" as const, priority: 0.4 },
  ];

  return staticPages.map((page) => ({
    ...page,
    lastModified: now,
  }));
}
