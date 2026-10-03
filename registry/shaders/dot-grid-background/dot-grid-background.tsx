import { DotGrid, type DotGridProps } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

type DotGridBackgroundProps = React.ComponentProps<"div"> & {
  colorBack?: string
  colorFill?: string
  /** Dot diameter, in px. */
  size?: number
  /** Distance between dots, in px. */
  gap?: number
  shape?: DotGridProps["shape"]
  /** Fade the grid out towards the edges of the container. */
  fade?: boolean
}

function DotGridBackground({
  colorBack = "#09090b",
  colorFill = "#3f3f46",
  size = 2,
  gap = 24,
  shape = "circle",
  fade = true,
  className,
  children,
  style,
  ...props
}: DotGridBackgroundProps) {
  return (
    <div
      data-slot="dot-grid-background"
      className={cn("relative isolate overflow-hidden", className)}
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      <DotGrid
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 size-full",
          fade &&
            "mask-radial-from-40% mask-radial-to-80% mask-radial-at-center"
        )}
        colorBack="#00000000"
        colorFill={colorFill}
        colorStroke="#00000000"
        size={size}
        gapX={gap}
        gapY={gap}
        shape={shape}
      />
      {children}
    </div>
  )
}

export { DotGridBackground }
