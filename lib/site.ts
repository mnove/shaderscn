/** Where the registry is served from. Set `NEXT_PUBLIC_REGISTRY_URL` when deploying. */
export const REGISTRY_URL = (
  process.env.NEXT_PUBLIC_REGISTRY_URL ?? "http://localhost:3000"
).replace(/\/$/, "")

/** The shadcn registry namespace users install from, e.g. `@shaderscn/god-rays-hero`. */
export const REGISTRY_NAMESPACE = "@shaderscn"

export const PAPER_SHADERS_URL = "https://shaders.paper.design"

export function registryAddCommand() {
  return `npx shadcn@latest registry add ${REGISTRY_NAMESPACE}=${REGISTRY_URL}/r/{name}.json`
}

/** Needs the `@shaderscn` registry in the project's `components.json`. */
export function installCommand(name: string) {
  return `npx shadcn@latest add ${REGISTRY_NAMESPACE}/${name}`
}

/** Works in any shadcn project, no registry setup required. */
export function urlInstallCommand(name: string) {
  return `npx shadcn@latest add ${REGISTRY_URL}/r/${name}.json`
}
