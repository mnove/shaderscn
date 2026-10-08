import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDownIcon, InfoIcon, StarIcon } from "lucide-react"

import { baseOpenGraph, siteDescription, websiteId } from "@/lib/metadata"
import { getItemKind, getRegistryItems } from "@/lib/registry"
import { GITHUB_URL, REGISTRY_URL, urlInstallCommand } from "@/lib/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CommandSnippet } from "@/components/command-snippet"
import { HeroShader } from "@/components/hero-shader"
import { JsonLd } from "@/components/json-ld"
import { ShaderCard } from "@/components/shader-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

// Set here rather than in the layout, which would hand every page the
// homepage's canonical URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...baseOpenGraph, url: "/" },
}

const GROUPS = [
  {
    id: "sections",
    kind: "Section",
    title: "Sections",
    description:
      "Full-width shader sections for landing pages: heroes, pricing, waitlists, footers and more.",
  },
  {
    id: "components",
    kind: "Component",
    title: "Components",
    description:
      "Shader backgrounds, cards, buttons and avatars to drop into any layout.",
  },
] as const

export default function Page() {
  const items = getRegistryItems()

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": websiteId,
          name: "shaderscn",
          url: REGISTRY_URL,
          description: siteDescription,
        }}
      />
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex max-w-2xl min-w-0 flex-col gap-4 self-center">
            <h1 className="font-heading text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
              Shader components you can copy and paste.
            </h1>
            <p className="text-sm/relaxed text-pretty text-muted-foreground sm:text-base/relaxed">
              Sections, backgrounds and components built on{" "}
              <a
                href="https://shaders.paper.design"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-4"
              >
                Paper Shaders
              </a>
              . Install them with the shadcn CLI or copy the code straight into
              your app.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="#sections"
                className={cn(buttonVariants({ size: "lg" }), "px-4")}
              >
                Browse shaders <ArrowDownIcon data-icon="inline-end" />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "px-4"
                )}
              >
                <StarIcon
                  data-icon="inline-start"
                  className="fill-yellow-400 text-yellow-400"
                />
                Star on GitHub
              </a>
            </div>
            <CommandSnippet
              command={urlInstallCommand("god-rays-hero")}
              className="mt-2 w-full max-w-xl"
            >
              <Link
                href="/docs"
                aria-label="Setup guide"
                title="Works in any shadcn project. Add the @shaderscn registry for the shorter form. See the setup guide."
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon-sm",
                })}
              >
                <InfoIcon />
              </Link>
            </CommandSnippet>
          </div>
          <HeroShader className="h-56 sm:h-72 lg:h-auto lg:min-h-96" />
        </div>
        {GROUPS.map((group) => (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-heading`}
            className="flex scroll-mt-20 flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <h2
                id={`${group.id}-heading`}
                className="font-heading text-xl tracking-tight"
              >
                {group.title}
              </h2>
              <p className="text-sm/relaxed text-muted-foreground">
                {group.description}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {items
                .filter((item) => getItemKind(item) === group.kind)
                .map((item) => (
                  <ShaderCard key={item.name} item={item} />
                ))}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  )
}
