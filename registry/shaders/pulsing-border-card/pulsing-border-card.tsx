"use client"

import * as React from "react"
import { PulsingBorder } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

// How far (in px) the glow is allowed to bleed outside the card.
const GLOW = 48

type PulsingBorderCardProps = React.ComponentProps<"div"> & {
  colors?: string[]
  speed?: number
}

function PulsingBorderCard({
  colors = ["#0dc1fd", "#d915ef", "#ff3f2ecc"],
  speed = 1,
  className,
  children,
  ...props
}: PulsingBorderCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width: width + GLOW * 2, height: height + GLOW * 2 })
    })
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  // The shader expresses margins as a fraction of the canvas, so convert the
  // pixel outset into fractions to keep the border glued to the card edges.
  const marginX = size.width ? GLOW / size.width : 0
  const marginY = size.height ? GLOW / size.height : 0

  return (
    <div
      ref={ref}
      data-slot="pulsing-border-card"
      className={cn("relative isolate w-full max-w-md", className)}
      {...props}
    >
      {size.width > 0 && (
        <PulsingBorder
          aria-hidden
          className="pointer-events-none absolute -z-10"
          style={{ inset: -GLOW }}
          colors={colors}
          colorBack="#00000000"
          speed={speed}
          roundness={0}
          thickness={0.06}
          softness={0.75}
          intensity={0.3}
          bloom={0.3}
          spots={4}
          spotSize={0.5}
          pulse={0.25}
          smoke={0.3}
          smokeSize={0.5}
          scale={1}
          marginLeft={marginX}
          marginRight={marginX}
          marginTop={marginY}
          marginBottom={marginY}
        />
      )}
      <div className="relative h-full bg-card p-6 text-card-foreground">
        {children ?? (
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              Assistant
            </span>
            <h3 className="font-heading text-lg leading-tight">
              Ask me anything
            </h3>
            <p className="text-sm text-muted-foreground">
              A soft, living glow that draws attention without shouting. Wrap
              any content to make it feel alive.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export { PulsingBorderCard }
