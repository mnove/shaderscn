import { REGISTRY_URL } from "@/lib/site"

export const siteTitle = "shaderscn — Shader components for shadcn/ui"

export const siteDescription =
  "Copy-paste animated shader sections, backgrounds and components for shadcn/ui and React, built on Paper Shaders. Install them with the shadcn CLI."

// Lets structured data on other pages point at the homepage's WebSite.
export const websiteId = `${REGISTRY_URL}/#website`

/** Absolute URL for a site path, for canonical links and Open Graph. */
export function absoluteUrl(path: string) {
  return new URL(path, REGISTRY_URL).href
}

/** Open Graph image for a page, generated at build time by `scripts/og-images.tsx`. */
export function ogImagePath(name: string) {
  return `/og/${name}.png`
}

/**
 * Head tags for an indexable page. Routes' meta tags merge by name/property
 * with the deepest route winning, so these override the root's defaults.
 */
export function pageHead({
  title,
  description = siteDescription,
  path,
  image,
  imageAlt,
}: {
  /** Shown as "<title> · shaderscn". Omit for the site title. */
  title?: string
  description?: string
  path: string
  image: string
  imageAlt: string
}) {
  const fullTitle = title ? `${title} · shaderscn` : siteTitle

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: title ?? siteTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: absoluteUrl(path) },
      { property: "og:image", content: absoluteUrl(image) },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(path) }],
  }
}
