import type { MetadataRoute } from "next";
import { roster } from "@/lib/players";
import { articles } from "@/lib/news";
import { allMatches } from "@/lib/matches";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toronto-maple-leaves.vercel.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "daily" },
    { path: "/team", priority: 0.9, changeFrequency: "weekly" },
    { path: "/schedule", priority: 0.9, changeFrequency: "daily" },
    { path: "/standings", priority: 0.8, changeFrequency: "daily" },
    { path: "/stats", priority: 0.7, changeFrequency: "weekly" },
    { path: "/news", priority: 0.9, changeFrequency: "daily" },
    { path: "/youth", priority: 0.8, changeFrequency: "monthly" },
    { path: "/shop", priority: 0.7, changeFrequency: "weekly" },
    { path: "/tickets", priority: 0.8, changeFrequency: "weekly" },
    { path: "/history", priority: 0.5, changeFrequency: "yearly" },
    { path: "/gallery", priority: 0.5, changeFrequency: "monthly" },
    { path: "/partners", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${siteUrl}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...roster.map((p) => ({
      url: `${siteUrl}/team/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...articles.map((a) => ({
      url: `${siteUrl}/news/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...allMatches.map((m) => ({
      url: `${siteUrl}/match/${m.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
