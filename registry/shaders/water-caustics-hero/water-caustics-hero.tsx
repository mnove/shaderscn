import { Water } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type WaterCausticsHeroProps = React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  /**
   * Optional photo to ripple under the water, like a pool or a beach from
   * above. Remote images must be served with CORS headers.
   */
  image?: string
  /** Color of the water. */
  colorBack?: string
  /** Color of the caustic light. */
  colorHighlight?: string
  speed?: number
}

function WaterCausticsHero({
  eyebrow = "Retreats on the Aegean",
  title = "Slow down. Float a while.",
  description = "Seven days of sea air, warm stone and nothing on the calendar. Small groups, quiet coves, no phones at dinner.",
  primaryAction = { label: "Plan your stay", href: "#" },
  secondaryAction = { label: "See the villas", href: "#" },
  image,
  colorBack = "#0e8fa8",
  colorHighlight = "#ffffff",
  speed = 0.6,
  className,
  ...props
}: WaterCausticsHeroProps) {
  return (
    <section
      data-slot="water-caustics-hero"
      className={cn(
        "relative isolate flex min-h-[640px] w-full flex-col justify-center overflow-hidden px-6 py-24 text-white md:px-12 lg:px-16",
        className
      )}
      style={{ backgroundColor: colorBack }}
      {...props}
    >
      <Water
        aria-hidden
        className="absolute inset-0 -z-10 size-full"
        image={image}
        fit="cover"
        colorBack={colorBack}
        colorHighlight={colorHighlight}
        highlights={0.5}
        layering={0.5}
        edges={1}
        waves={0.3}
        caustic={0.3}
        size={0.3}
        scale={1}
        speed={speed}
      />
      {/* Deepens the water behind the copy so it stays readable. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-black/45 via-black/15 to-transparent"
      />
      <div className="flex max-w-xl flex-col gap-6">
        <span className="font-mono text-[11px] tracking-widest text-white/80 uppercase">
          {eyebrow}
        </span>
        <h1 className="font-heading text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
          {title}
        </h1>
        <p className="max-w-md text-base text-pretty text-white/85 sm:text-lg">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={primaryAction.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-white text-black hover:bg-white/80"
            )}
          >
            {primaryAction.label}
          </a>
          <a
            href={secondaryAction.href}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
            )}
          >
            {secondaryAction.label}
          </a>
        </div>
      </div>
    </section>
  )
}

export { WaterCausticsHero }
