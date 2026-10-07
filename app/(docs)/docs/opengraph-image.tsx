import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "Get started with shaderscn"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    eyebrow: "Docs",
    title: "Get started",
    description:
      "Install shaderscn sections and components with the shadcn CLI, or copy the source directly.",
  })
}
