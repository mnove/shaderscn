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

/** Items grouped for the docs sidebar and search, with only what the client needs. */
export function getDocsGroups() {
  return GROUPS.map((group) => ({
    ...group,
    items: registry.items
      .filter((item) => item.categories[0] === group.id)
      .map(({ name, title, description }) => ({ name, title, description })),
  }))
}

export type DocsGroup = ReturnType<typeof getDocsGroups>[number]

// Each file is its own lazy chunk, so a page only loads the source it shows.
const sources = import.meta.glob<string>("/registry/shaders/**/*.{ts,tsx}", {
  query: "?raw",
  import: "default",
})

export async function getItemSource(item: RegistryItem) {
  return Promise.all(
    item.files.map(async (file) => ({
      name: file.path.split("/").pop() ?? file.path,
      content: await sources[`/${file.path}`](),
    }))
  )
}

export function getItemKind(item: RegistryItem) {
  return item.type === "registry:block" ? "Section" : "Component"
}
