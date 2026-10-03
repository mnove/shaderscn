import { MeshGradient } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

type MeshGradientBackgroundProps = React.ComponentProps<"div"> & {
  colors?: string[]
  distortion?: number
  swirl?: number
  speed?: number
  grain?: number
}

function MeshGradientBackground({
  colors = ["#e0eaff", "#241d9a", "#f75092", "#9f50d3"],
  distortion = 0.8,
  swirl = 0.1,
  speed = 0.6,
  grain = 0.15,
  className,
  children,
  ...props
}: MeshGradientBackgroundProps) {
  return (
    <div
      data-slot="mesh-gradient-background"
      className={cn("relative isolate overflow-hidden", className)}
      {...props}
    >
      <MeshGradient
        aria-hidden
        className="absolute inset-0 -z-10 size-full"
        colors={colors}
        distortion={distortion}
        swirl={swirl}
        speed={speed}
        grainOverlay={grain}
      />
      {children}
    </div>
  )
}

export { MeshGradientBackground }
