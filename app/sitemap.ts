import type { MetadataRoute } from "next";
import { getGuides } from "@/lib/content";
import { getProductSlugs } from "@/lib/products";
import { site } from "@/lib/site";

// Rebuilt at most hourly, and immediately whenever a Supabase webhook calls /api/revalidate.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, guides] = await Promise.all([getProductSlugs(), getGuides()]);

  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/style-and-care-guide`, changeFrequency: "weekly", priority: 0.8 },
    ...guides.map((g) => ({
      url: `${site.url}/style-and-care-guide/${g.slug}`,
      lastModified: g.updated_at ?? g.published_at,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...productSlugs.map((slug) => ({
      url: `${site.url}/products/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...["/shipping", "/returns", "/privacy", "/terms"].map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
