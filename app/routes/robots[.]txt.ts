import { createFileRoute } from "@tanstack/react-router"

import { REGISTRY_URL } from "@/lib/site"

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          `User-Agent: *\nAllow: /\n\nSitemap: ${REGISTRY_URL}/sitemap.xml\n`,
          { headers: { "Content-Type": "text/plain" } }
        ),
    },
  },
})
