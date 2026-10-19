import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

function CodeBlock({
  code,
  title,
  className,
}: {
  code: string
  title?: string
  className?: string
}) {
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
        <code>{code}</code>
      </pre>
    </div>
  )
}

export { CodeBlock }
