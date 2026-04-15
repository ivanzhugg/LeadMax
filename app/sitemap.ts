import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { cases } from "@/data/cases";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

const staticPages = [
  { path: "/", priority: 1 },
  { path: "/cases", priority: 0.75 },
  { path: "/blog", priority: 0.7 },
  { path: "/contacts", priority: 0.75 },
  { path: "/about", priority: 0.45 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
  { path: "/offer", priority: 0.2 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-02-24");

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority: page.priority
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/${service.slug}`),
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority: 0.9
    })),
    ...cases.map((caseItem) => ({
      url: absoluteUrl(`/cases/${caseItem.slug}`),
      lastModified: new Date(caseItem.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.65
    })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
