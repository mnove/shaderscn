import { cn } from "@/lib/utils"
import type { PreviewLayout } from "@/registry/previews"

/**
 * Lays an item out according to its preview layout. Used both for the
 * full-size preview and inside scaled thumbnails.
 */
function PreviewFrame({
  layout,
  className,
  children,
}: {
  layout: PreviewLayout
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      data-layout={layout}
      className={cn(
        "relative flex size-full",
        layout === "component" &&
          "items-center justify-center bg-muted/40 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[16px_16px] p-10",
        layout === "section" && "flex-col justify-center *:min-h-full",
        className
      )}
    >
      {children}
    </div>
  )
}

export { PreviewFrame }
