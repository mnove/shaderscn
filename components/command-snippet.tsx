import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

/** A shell command in a boxed row with a copy button. */
function CommandSnippet({
  command,
  className,
  children,
}: {
  command: string
  className?: string
  /** Extra actions, shown before the copy button. */
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border bg-card py-1.5 pr-1.5 pl-4",
        className
      )}
    >
      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-xs whitespace-nowrap">
        {command}
      </code>
      {children}
      <CopyButton value={command} />
    </div>
  )
}

export { CommandSnippet }
