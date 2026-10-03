"use client"

import * as React from "react"
import { LiquidMetal } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

type LiquidMetalButtonProps = React.ComponentProps<"button"> & {
  /** Width of the chrome rim, in px. */
  rim?: number
  colorTint?: string
  speed?: number
}

function LiquidMetalButton({
  rim = 4,
  colorTint = "#ffffff",
  speed = 0.6,
  className,
  children,
  style,
  onPointerEnter,
  onPointerLeave,
  ...props
}: LiquidMetalButtonProps) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <button
      data-slot="liquid-metal-button"
      className={cn(
        "group/liquid-metal relative isolate inline-flex h-12 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full text-sm font-medium whitespace-nowrap text-white shadow-lg shadow-black/20 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      style={{ padding: rim, ...style }}
      onPointerEnter={(event) => {
        setHovered(true)
        onPointerEnter?.(event)
      }}
      onPointerLeave={(event) => {
        setHovered(false)
        onPointerLeave?.(event)
      }}
      {...props}
    >
      <LiquidMetal
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 size-full"
        shape="none"
        colorBack="#aaaaac"
        colorTint={colorTint}
        // Speed the metal up while hovered so the button feels responsive.
        speed={hovered ? speed * 4 : speed}
        repetition={4}
        softness={0.05}
        shiftRed={0.3}
        shiftBlue={0.3}
        distortion={0.1}
        contour={0.4}
        angle={90}
        scale={1}
      />
      <span className="flex size-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 transition-colors group-hover/liquid-metal:bg-neutral-900 [&_svg]:size-4 [&_svg]:shrink-0">
        {children}
      </span>
    </button>
  )
}

export { LiquidMetalButton }
