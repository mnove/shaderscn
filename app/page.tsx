import { getRegistryItems } from "@/lib/registry"
import { ShaderCard } from "@/components/shader-card"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  const items = getRegistryItems()

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex max-w-2xl flex-col gap-4">
          <h1 className="font-heading text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
            Shader components you can copy and paste.
          </h1>
          <p className="text-sm/relaxed text-pretty text-muted-foreground sm:text-base/relaxed">
            Sections, backgrounds and components built on{" "}
            <a
              href="https://shaders.paper.design"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              Paper Shaders
            </a>
            . Install them with the shadcn CLI or copy the code straight into
            your app.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <ShaderCard key={item.name} item={item} />
          ))}
        </div>
      </main>
    </>
  )
}
