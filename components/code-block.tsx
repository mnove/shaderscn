import { codeToHtml } from "shiki"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
}: {
  code: string
  lang?: string
  title?: string
  className?: string
}) {
  const html = await codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  })

  return (
    <div className={cn("relative overflow-hidden border bg-card", className)}>
      {title ? (
        <div className="flex h-10 items-center justify-between border-b pr-1.5 pl-4">
          <span className="font-mono text-xs text-muted-foreground">
            {title}
          </span>
          <CopyButton value={code} />
        </div>
      ) : (
        <CopyButton value={code} className="absolute top-1.5 right-1.5 z-10" />
      )}
      <div
        className="code-block max-h-[600px] overflow-auto text-[13px] leading-relaxed [&_pre]:min-w-max [&_pre]:p-4 [&_pre]:pr-12"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export { CodeBlock }
