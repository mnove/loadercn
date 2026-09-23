import type { MetadataRoute } from "next"
import { SITE_URL, getLoaderSummaries } from "@/lib/loader-items"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/docs`, priority: 0.8 },
    ...getLoaderSummaries().map((item) => ({
      url: `${SITE_URL}/docs/${item.name}`,
      priority: 0.6,
    })),
  ]
}
