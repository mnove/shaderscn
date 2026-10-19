import { createFileRoute, notFound } from "@tanstack/react-router"

import { getPreview, getRegistryItem } from "@/lib/registry"
import { PreviewFrame } from "@/components/preview-frame"
import { PreviewHeightReporter } from "@/components/preview-iframe"

// Bare previews embedded by the shader pages. They're crawlable but noindex,
// which also keeps their content from counting toward the embedding page.
// Don't disallow them in robots.txt, or crawlers never see the noindex.

export const Route = createFileRoute("/preview/$name")({
  loader: ({ params }) => {
    const item = getRegistryItem(params.name)
    if (!item) throw notFound()
    return { item }
  },
  head: ({ loaderData }) => ({
    meta: [
      ...(loaderData
        ? [{ title: `${loaderData.item.title} preview · shaderscn` }]
        : []),
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PreviewPage,
})

function PreviewPage() {
  const { item } = Route.useLoaderData()
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
