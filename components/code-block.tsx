import { parse, render } from "sugar-high/core"
import * as shell from "sugar-high/lang/shell"
import * as typescript from "sugar-high/lang/typescript"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

// Only the languages the site shows. The default "sugar-high" entry bundles
// every language it supports.
const languages = { tsx: typescript, shell }

function CodeBlock({
  code,
  title,
  lang = "tsx",
  className,
}: {
  code: string
  title?: string
  lang?: keyof typeof languages
  className?: string
}) {
  // Rendered during prerender and again on hydration; the output is
  // deterministic, so both match. Colors come from the --sh-* variables in
  // globals.css.
  const html = render(parse(code, languages[lang]))

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
      <pre className="max-h-[600px] overflow-auto p-4 pr-12 font-mono text-[13px] leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  )
}

export { CodeBlock }
