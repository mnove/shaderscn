import registry from "@/registry.json"

// Where the registry is served from. Also the site's canonical origin, used
// for metadata, the sitemap and robots.
export const REGISTRY_URL = (
  import.meta.env.VITE_REGISTRY_URL ??
  (import.meta.env.PROD ? registry.homepage : "http://localhost:3000")
).replace(/\/$/, "")

/** The shadcn registry namespace users install from, e.g. `@shaderscn/god-rays-hero`. */
export const REGISTRY_NAMESPACE = "@shaderscn"

export const PAPER_SHADERS_URL = "https://shaders.paper.design"

export const GITHUB_URL = "https://github.com/mnove/shaderscn"

/** `@shaderscn` is listed in the shadcn registry directory, so no setup is needed. */
export function installCommand(name: string) {
  return `npx shadcn@latest add ${REGISTRY_NAMESPACE}/${name}`
}

/** Installs straight from the URL, for CLI versions without the registry directory. */
export function urlInstallCommand(name: string) {
  return `npx shadcn@latest add ${REGISTRY_URL}/r/${name}.json`
}
