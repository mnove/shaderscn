import { createFileRoute } from "@tanstack/react-router"

import registry from "@/registry.json"
import { REGISTRY_URL } from "@/lib/site"

// Reads registry.json directly: lib/registry pulls in every shader component.
const urls = [
  // With the trailing slash, to match the homepage's canonical URL.
  { url: `${REGISTRY_URL}/`, priority: 1 },
  { url: `${REGISTRY_URL}/docs`, priority: 0.9 },
  ...registry.items.map((item) => ({
    url: `${REGISTRY_URL}/shaders/${item.name}`,
    priority: 0.8,
  })),
]

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ url, priority }) =>
      `<url>\n<loc>${url}</loc>\n<priority>${priority}</priority>\n</url>`
  )
  .join("\n")}
</urlset>
`,
          { headers: { "Content-Type": "application/xml" } }
        ),
    },
  },
})
