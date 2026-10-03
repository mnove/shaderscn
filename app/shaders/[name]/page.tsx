import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import {
  getInstallCommand,
  getItemKind,
  getItemSource,
  getPreview,
  getRegistryItem,
  getRegistryItems,
} from "@/lib/registry"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { CopyButton } from "@/components/copy-button"
import { PreviewFrame } from "@/components/preview-frame"
import { SiteHeader } from "@/components/site-header"

export const dynamicParams = false

export function generateStaticParams() {
  return getRegistryItems().map((item) => ({ name: item.name }))
}

export async function generateMetadata({
  params,
}: PageProps<"/shaders/[name]">): Promise<Metadata> {
  const { name } = await params
  const item = getRegistryItem(name)

  return item
    ? { title: `${item.title} · shaderscn`, description: item.description }
    : {}
}

export default async function ShaderPage({
  params,
}: PageProps<"/shaders/[name]">) {
  const { name } = await params
  const item = getRegistryItem(name)
  if (!item) notFound()

  const preview = getPreview(item.name)
  const files = await getItemSource(item)
  const installCommand = getInstallCommand(item.name)

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex w-fit items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="size-3.5" />
            All shaders
          </Link>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-2xl tracking-tight sm:text-3xl">
                {item.title}
              </h1>
              <Badge variant="outline">{getItemKind(item)}</Badge>
            </div>
            <p className="max-w-2xl text-sm/relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        </div>

        <Tabs defaultValue="preview">
          <TabsList variant="line">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="pt-2">
            <div
              className={cn(
                "overflow-hidden border",
                preview.layout !== "section" && "h-[520px]"
              )}
            >
              <PreviewFrame layout={preview.layout}>
                {preview.element}
              </PreviewFrame>
            </div>
          </TabsContent>
          <TabsContent value="code" className="flex flex-col gap-4 pt-2">
            {files.map((file) => (
              <CodeBlock
                key={file.name}
                title={file.name}
                code={file.content}
              />
            ))}
          </TabsContent>
        </Tabs>

        <Separator />

        <section className="flex max-w-3xl flex-col gap-6">
          <h2 className="font-heading text-xl tracking-tight">Installation</h2>
          <Tabs defaultValue="cli">
            <TabsList variant="line">
              <TabsTrigger value="cli">CLI</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            <TabsContent value="cli" className="pt-2">
              <div className="flex items-center gap-2 border bg-card py-1.5 pr-1.5 pl-4">
                <code className="flex-1 overflow-x-auto font-mono text-xs whitespace-nowrap">
                  {installCommand}
                </code>
                <CopyButton value={installCommand} />
              </div>
            </TabsContent>
            <TabsContent value="manual" className="flex flex-col gap-4 pt-2">
              <Step n={1} title="Install the dependencies">
                <CodeBlock
                  lang="bash"
                  code={`npm install ${item.dependencies.join(" ")}`}
                />
                {item.registryDependencies && (
                  <CodeBlock
                    lang="bash"
                    code={`npx shadcn@latest add ${item.registryDependencies.join(" ")}`}
                  />
                )}
              </Step>
              <Step
                n={2}
                title="Copy and paste the following code into your project"
              >
                {files.map((file) => (
                  <CodeBlock
                    key={file.name}
                    title={`components/${file.name}`}
                    code={file.content}
                  />
                ))}
              </Step>
            </TabsContent>
          </Tabs>

          <h2 className="font-heading text-xl tracking-tight">Usage</h2>
          <CodeBlock code={preview.usage} />
        </section>
      </main>
    </>
  )
}

function Step({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-center gap-2 text-sm">
        <span className="flex size-5 items-center justify-center border font-mono text-[11px]">
          {n}
        </span>
        {title}
      </p>
      {children}
    </div>
  )
}
