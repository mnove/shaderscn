import { LiquidMetal, type LiquidMetalProps } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

type LiquidMetalOrbProps = React.ComponentProps<"div"> & {
  size?: number
  shape?: LiquidMetalProps["shape"]
  colorBack?: string
  colorTint?: string
  speed?: number
}

function LiquidMetalOrb({
  size = 240,
  shape = "circle",
  colorBack = "#00000000",
  colorTint = "#ffffff",
  speed = 1,
  className,
  children,
  style,
  ...props
}: LiquidMetalOrbProps) {
  return (
    <div
      data-slot="liquid-metal-orb"
      className={cn(
        "relative grid shrink-0 place-items-center *:[grid-area:1/1]",
        className
      )}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <LiquidMetal
        aria-hidden
        className="size-full"
        shape={shape}
        colorBack={colorBack}
        colorTint={colorTint}
        speed={speed}
        repetition={2}
        softness={0.1}
        shiftRed={0.3}
        shiftBlue={0.3}
        distortion={0.07}
        contour={0.4}
        angle={70}
        scale={1}
      />
      {children ? <div className="relative">{children}</div> : null}
    </div>
  )
}

export { LiquidMetalOrb }
