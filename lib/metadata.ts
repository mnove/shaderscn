import type { Metadata } from "next"

import { REGISTRY_URL } from "@/lib/site"

export const siteDescription =
  "Copy-paste animated shader sections, backgrounds and components for shadcn/ui and React, built on Paper Shaders. Install them with the shadcn CLI."

// Lets structured data on other pages point at the homepage's WebSite.
export const websiteId = `${REGISTRY_URL}/#website`

// Metadata merges shallowly, so a page that sets its own `openGraph` replaces
// the layout's. Spread this into each one to keep the shared fields.
export const baseOpenGraph = {
  type: "website",
  siteName: "shaderscn",
  locale: "en_US",
} satisfies Metadata["openGraph"]
