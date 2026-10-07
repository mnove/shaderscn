import type { Metadata } from "next"
import { Geist_Mono, Inter, Merriweather } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { baseOpenGraph } from "@/lib/metadata"
import { REGISTRY_URL } from "@/lib/registry"
import { cn } from "@/lib/utils";

const merriweatherHeading = Merriweather({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(REGISTRY_URL),
  title: {
    default: "shaderscn — Shader components for shadcn/ui",
    template: "%s · shaderscn",
  },
  description:
    "Copy-paste animated shader sections, backgrounds and components for shadcn/ui and React, built on Paper Shaders. Install them with the shadcn CLI.",
  openGraph: baseOpenGraph,
  twitter: { card: "summary_large_image" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, merriweatherHeading.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
