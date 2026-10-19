import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"

import appCss from "../globals.css?url"
import { siteDescription, siteTitle } from "@/lib/metadata"
import { ThemeProvider } from "@/components/theme-provider"
import { NotFound } from "@/components/not-found"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteTitle },
      { name: "description", content: siteDescription },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "shaderscn" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/icon.png", type: "image/png", sizes: "256x256" },
      { rel: "apple-touch-icon", href: "/apple-icon.png", sizes: "180x180" },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
