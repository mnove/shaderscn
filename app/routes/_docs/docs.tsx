import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowUpRightIcon } from "lucide-react"

import { ogImagePath, pageHead } from "@/lib/metadata"
import {
  installCommand,
  PAPER_SHADERS_URL,
  REGISTRY_NAMESPACE,
  urlInstallCommand,
} from "@/lib/site"
import { buttonVariants } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"
import { CommandSnippet } from "@/components/command-snippet"

const title = "Get started"
const description =
  "Add shaderscn sections and components to your project with the shadcn CLI, or copy the source directly."

export const Route = createFileRoute("/_docs/docs")({
  head: () =>
    pageHead({
      title,
      description,
      path: "/docs",
      image: ogImagePath("docs"),
      imageAlt: "Get started with shaderscn",
    }),
  component: DocsPage,
})

const EXAMPLE = "god-rays-hero"

function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-14 sm:px-6 md:px-10">
      <section className="flex flex-col gap-4 border-b py-12 sm:py-16">
        <h1 className="font-heading text-3xl leading-tight tracking-tight sm:text-4xl">
          Get started
        </h1>
        <p className="max-w-xl text-sm/relaxed text-pretty text-muted-foreground">
          Install shaders with the shadcn CLI or copy the source into your
          project. Each item is a React component built on{" "}
          <a
            href={PAPER_SHADERS_URL}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            Paper Shaders
          </a>{" "}
          and styled with Tailwind.
        </p>
      </section>

      <Step index="01" title="Set up shadcn">
        <Text>Already using shadcn? You can skip this step.</Text>
        <CommandSnippet command="npx shadcn@latest init" />
      </Step>

      <Step index="02" title="Add a shader">
        <Text>
          Every shader has its own install command. Pick one from the sidebar to
          copy it, or swap the name below. <Code>{REGISTRY_NAMESPACE}</Code> is
          listed in the shadcn registry directory, so there&apos;s nothing to
          configure. The CLI also installs{" "}
          <Code>@paper-design/shaders-react</Code> and any shadcn components it
          uses.
        </Text>
        <CommandSnippet command={installCommand(EXAMPLE)} />
        <Text>
          On an older version of the CLI? Install directly from the URL instead.
        </Text>
        <CommandSnippet command={urlInstallCommand(EXAMPLE)} />
      </Step>

      <Step index="03" title="Use it">
        <Text>
          The component lives in your codebase, so every detail is yours to
          change.
        </Text>
        <CodeBlock
          code={`import { GodRaysHero } from "@/components/god-rays-hero"\n\nexport default function Page() {\n  return <GodRaysHero title="Light up your next launch" />\n}`}
        />
      </Step>

      <Step index="04" title="Customize">
        <Text>
          Content such as titles, descriptions and actions is passed as props.
          Any other props, including <Code>className</Code>, are forwarded to
          the root element. The shader itself is configured inside the
          component: edit its colors, speed and shape directly in the source.
          See the{" "}
          <a
            href={PAPER_SHADERS_URL}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            Paper Shaders
          </a>{" "}
          playground for every parameter.
        </Text>
      </Step>

      <Step index="05" title="Copy and paste">
        <Text>
          Prefer to skip the CLI? Every shader page has a Manual tab with the
          dependencies to install and the complete source to paste.
        </Text>
        <div className="flex flex-wrap gap-2">
          <Link to="/" className={buttonVariants()}>
            Browse shaders
          </Link>
          <a
            href="/r/registry.json"
            target="_blank"
            className={buttonVariants({ variant: "outline" })}
          >
            View registry JSON <ArrowUpRightIcon />
          </a>
        </div>
      </Step>
    </div>
  )
}

function Step({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-4 border-b py-10 md:grid-cols-[180px_1fr] md:gap-10">
      <h2 className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
        {index} — {title}
      </h2>
      <div className="flex min-w-0 flex-col gap-4">{children}</div>
    </section>
  )
}

function Text({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm/relaxed text-pretty text-muted-foreground">
      {children}
    </p>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-xs text-foreground">{children}</code>
}
