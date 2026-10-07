import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const alt = "shaderscn: shader components you can copy and paste"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({
    title: "Shader components you can copy and paste.",
    description:
      "Animated sections, backgrounds and components for shadcn/ui, built on Paper Shaders.",
  })
}
