import type { MetadataRoute } from "next"

import { getRegistryItems, REGISTRY_URL } from "@/lib/registry"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: REGISTRY_URL, priority: 1 },
    ...getRegistryItems().map((item) => ({
      url: `${REGISTRY_URL}/shaders/${item.name}`,
      priority: 0.8,
    })),
  ]
}
