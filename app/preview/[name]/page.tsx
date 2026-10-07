import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getPreview, getRegistryItem, getRegistryItems } from "@/lib/registry"
import { PreviewFrame } from "@/components/preview-frame"
import { PreviewHeightReporter } from "@/components/preview-iframe"

// Bare previews embedded by the shader pages. They're crawlable but noindex,
// which also keeps their content from counting toward the embedding page.
// Don't disallow them in robots.txt, or crawlers never see the noindex.

export const dynamicParams = false

export function generateStaticParams() {
  return getRegistryItems().map((item) => ({ name: item.name }))
}

export async function generateMetadata({
  params,
}: PageProps<"/preview/[name]">): Promise<Metadata> {
  const { name } = await params
  const item = getRegistryItem(name)

  return {
    title: item ? `${item.title} preview` : undefined,
    robots: { index: false, follow: false },
  }
}

export default async function PreviewPage({
  params,
}: PageProps<"/preview/[name]">) {
  const { name } = await params
  const item = getRegistryItem(name)
  if (!item) notFound()

  const preview = getPreview(item.name)
  const frame = (
    <PreviewFrame layout={preview.layout}>{preview.element}</PreviewFrame>
  )

  // Sections size the iframe to their content; everything else fills it.
  return preview.layout === "section" ? (
    <PreviewHeightReporter>{frame}</PreviewHeightReporter>
  ) : (
    <div className="h-svh">{frame}</div>
  )
}
