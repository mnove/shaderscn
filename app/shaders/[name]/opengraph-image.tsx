import { notFound } from "next/navigation"

import { getItemKind, getRegistryItem, getRegistryItems } from "@/lib/registry"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

// Image routes don't inherit the page's static params, so list them again to
// render every card at build time. A per-item alt would need
// generateImageMetadata, which stops these from being prerendered.
export const dynamicParams = false

export function generateStaticParams() {
  return getRegistryItems().map((item) => ({ name: item.name }))
}

export const alt = "A shaderscn shader component for shadcn/ui"
export const size = ogSize
export const contentType = ogContentType

export default async function Image({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const item = getRegistryItem(name)
  if (!item) notFound()

  return renderOgImage({
    eyebrow: `Shader ${getItemKind(item)}`,
    title: item.title,
    description: item.description,
  })
}
