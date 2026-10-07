import { promises as fs } from "node:fs"
import path from "node:path"

import registry from "@/registry.json"
import { previews } from "@/registry/previews"

export type RegistryItem = (typeof registry.items)[number]

/** Docs sidebar groups, keyed by each item's first category. */
export const GROUPS = [
  { id: "sections", label: "Sections" },
  { id: "backgrounds", label: "Backgrounds" },
  { id: "components", label: "Components" },
] as const

export type GroupId = (typeof GROUPS)[number]["id"]

export function getRegistryItems() {
  return registry.items
}

export function getRegistryItem(name: string) {
  return registry.items.find((item) => item.name === name)
}

export function getPreview(name: string) {
  return previews[name]
}

/** Items grouped for the docs sidebar, with only what the client needs. */
export function getDocsGroups() {
  return GROUPS.map((group) => ({
    ...group,
    items: registry.items
      .filter((item) => item.categories[0] === group.id)
      .map(({ name, title }) => ({ name, title })),
  }))
}

export type DocsGroup = ReturnType<typeof getDocsGroups>[number]

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
