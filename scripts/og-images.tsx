// Renders every page's Open Graph card into public/og/ before the site is
// built. The prerenderer writes responses as text, so binary images can't be
// served from routes on a static build.
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import registry from "@/registry.json"
import { renderOgImage } from "@/lib/og"

const outputDir = path.join(process.cwd(), "public/og")

const cards = [
  {
    name: "home",
    title: "Shader components you can copy and paste.",
    description:
      "Animated sections, backgrounds and components for shadcn/ui, built on Paper Shaders.",
  },
  {
    name: "docs",
    eyebrow: "Docs",
    title: "Get started",
    description:
      "Install shaderscn sections and components with the shadcn CLI, or copy the source directly.",
  },
  // Same wording as getItemKind, which can't be imported here: lib/registry
  // pulls in every shader component.
  ...registry.items.map((item) => ({
    name: `shaders/${item.name}`,
    eyebrow: `Shader ${item.type === "registry:block" ? "Section" : "Component"}`,
    title: item.title,
    description: item.description,
  })),
]

await mkdir(path.join(outputDir, "shaders"), { recursive: true })
await Promise.all(
  cards.map(async ({ name, ...card }) => {
    await writeFile(
      path.join(outputDir, `${name}.png`),
      await renderOgImage(card)
    )
  })
)
console.log(`Generated ${cards.length} Open Graph images in public/og/`)
