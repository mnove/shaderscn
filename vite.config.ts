import { defineConfig } from "vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

import registry from "./registry.json" with { type: "json" }

// Every page comes from registry.json, so the whole site is prerendered to
// static HTML at build time. Dynamic routes aren't discovered automatically,
// and the crawler doesn't follow iframes, so each one is listed here. Link
// crawling stays off: it would also try to prerender files such as
// /r/registry.json, which aren't routes.
const pages = [
  ...registry.items.flatMap((item) => [
    { path: `/shaders/${item.name}` },
    { path: `/preview/${item.name}` },
  ]),
  { path: "/robots.txt" },
  { path: "/sitemap.xml" },
  // Served by the host for unknown URLs. Nothing matches this path, so it's
  // the root route's notFoundComponent; see app/server.ts.
  {
    path: "/404",
    prerender: {
      outputPath: "/404.html",
      // NOT_FOUND_PAGE_HEADER in app/server.ts
      headers: { "x-prerender-not-found": "1" },
    },
  },
]

export default defineConfig({
  resolve: { tsconfigPaths: true },
  server: { port: 3000 },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: "app",
      pages,
      prerender: { enabled: true, crawlLinks: false, failOnError: true },
    }),
    viteReact(),
  ],
})
