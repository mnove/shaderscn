import {
  GrainGradient,
  type GrainGradientProps,
} from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

type GrainGradientCardProps = React.ComponentProps<"div"> & {
  eyebrow?: string
  title?: string
  description?: string
  colors?: string[]
  colorBack?: string
  shape?: GrainGradientProps["shape"]
}

function GrainGradientCard({
  eyebrow = "Collection",
  title = "Golden hour",
  description = "A slow, grainy wave of warm light. Drop it anywhere you need a little texture.",
  colors = ["#c4730b", "#bdad5f", "#d8ccc7"],
  colorBack = "#000a0f",
  shape = "wave",
  className,
  ...props
}: GrainGradientCardProps) {
  return (
    <div
      data-slot="grain-gradient-card"
      className={cn(
        "flex w-full max-w-sm flex-col overflow-hidden border bg-card text-card-foreground",
        className
      )}
      {...props}
    >
      <div className="relative aspect-video w-full">
        <GrainGradient
          aria-hidden
          className="absolute inset-0 size-full"
          colors={colors}
          colorBack={colorBack}
          shape={shape}
          softness={0.7}
          intensity={0.15}
          noise={0.5}
          speed={0.8}
        />
      </div>
      <div className="flex flex-col gap-1.5 p-5">
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          {eyebrow}
        </span>
        <h3 className="font-heading text-lg leading-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export { GrainGradientCard }
