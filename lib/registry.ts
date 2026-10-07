import { promises as fs } from "node:fs"
import path from "node:path"

import registry from "@/registry.json"
import { previews } from "@/registry/previews"

export type RegistryItem = (typeof registry.items)[number]

// Also the site's canonical origin, used for metadata, the sitemap and robots.
export const REGISTRY_URL = (
  process.env.NEXT_PUBLIC_REGISTRY_URL ??
  (process.env.NODE_ENV === "production"
    ? registry.homepage
    : "http://localhost:3000")
).replace(/\/$/, "")

export function getRegistryItems() {
  return registry.items
}

export function getRegistryItem(name: string) {
  return registry.items.find((item) => item.name === name)
}

export function getPreview(name: string) {
  return previews[name]
}

export function getInstallCommand(name: string) {
  return `npx shadcn@latest add ${REGISTRY_URL}/r/${name}.json`
}

export async function getItemSource(item: RegistryItem) {
  return Promise.all(
    item.files.map(async (file) => ({
      name: path.basename(file.path),
      // Scope the read to the registry folder so the build doesn't trace the
      // whole project into the server output.
      content: await fs.readFile(
        path.join(
          process.cwd(),
          "registry",
          path.relative("registry", file.path)
        ),
        "utf8"
      ),
    }))
  )
}

export function getItemKind(item: RegistryItem) {
  return item.type === "registry:block" ? "Section" : "Component"
}
