import type { MetadataRoute } from "next"

import { getRegistryItems } from "@/lib/registry"
import { REGISTRY_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: REGISTRY_URL, priority: 1 },
    { url: `${REGISTRY_URL}/docs`, priority: 0.9 },
    ...getRegistryItems().map((item) => ({
      url: `${REGISTRY_URL}/shaders/${item.name}`,
      priority: 0.8,
    })),
  ]
}
