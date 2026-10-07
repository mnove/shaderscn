import type { MetadataRoute } from "next"

import { REGISTRY_URL } from "@/lib/registry"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${REGISTRY_URL}/sitemap.xml`,
  }
}
