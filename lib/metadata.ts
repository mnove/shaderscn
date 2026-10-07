import type { Metadata } from "next"

// Metadata merges shallowly, so a page that sets its own `openGraph` replaces
// the layout's. Spread this into each one to keep the shared fields.
export const baseOpenGraph = {
  type: "website",
  siteName: "shaderscn",
  locale: "en_US",
} satisfies Metadata["openGraph"]
