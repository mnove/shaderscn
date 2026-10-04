import { Dithering, type DitheringProps } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

type DitheringFrameCardProps = React.ComponentProps<"div"> & {
  eyebrow?: string
  title?: string
  description?: string
  action?: { label: string; href: string }
  /** Width of the dithered frame around the card, in px. */
  frame?: number
  colorBack?: string
  colorFront?: string
  shape?: DitheringProps["shape"]
  type?: DitheringProps["type"]
  /** Size of a dither pixel. */
  size?: number
  speed?: number
}

function DitheringFrameCard({
  eyebrow = "New in 2.0",
  title = "Realtime collaboration",
  description = "See who's editing, follow their cursor and leave comments right where the work happens.",
  action = { label: "Read the announcement", href: "#" },
  frame = 12,
  colorBack = "#0a0a0a",
  colorFront = "#ff5f1f",
  shape = "warp",
  type = "4x4",
  size = 2,
  speed = 0.6,
  className,
  style,
  children,
  ...props
}: DitheringFrameCardProps) {
  return (
    <div
      data-slot="dithering-frame-card"
      className={cn("relative isolate w-full max-w-sm", className)}
      // The frame is just padding, so the shader shows through around the card.
      style={{ padding: frame, backgroundColor: colorBack, ...style }}
      {...props}
    >
      <Dithering
        aria-hidden
        className="absolute inset-0 -z-10 size-full"
        colorBack={colorBack}
        colorFront={colorFront}
        shape={shape}
        type={type}
        size={size}
        scale={0.6}
        speed={speed}
      />
      <div className="flex h-full flex-col gap-4 bg-card p-6 text-card-foreground">
        {children ?? (
          <>
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              {eyebrow}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-xl leading-tight">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <a
              href={action.href}
              className="mt-2 w-fit text-sm font-medium underline-offset-4 hover:underline"
            >
              {action.label} →
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export { DitheringFrameCard }
