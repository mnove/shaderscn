import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { DitheringGlobeArcs, type GlobeArc } from "./dithering-globe-arcs"

type DitheringGlobeArcsHeroProps = React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  arcs?: GlobeArc[]
  colorBack?: string
  colorFront?: string
  colorArc?: string
}

function DitheringGlobeArcsHero({
  eyebrow = "Global edge network",
  title = "Closer to every user, everywhere",
  description = "Requests route to the nearest region in milliseconds. Watch them fly across a live, ordered-dither globe.",
  primaryAction = { label: "Deploy now", href: "#" },
  secondaryAction = { label: "See regions", href: "#" },
  arcs,
  colorBack = "#000000",
  colorFront = "#38bdf8",
  colorArc = "#ffffff",
  className,
  style,
  ...props
}: DitheringGlobeArcsHeroProps) {
  return (
    <section
      data-slot="dithering-globe-arcs-hero"
      className={cn(
        "dark relative isolate flex w-full flex-col items-center overflow-hidden px-6 pt-24 text-center text-white",
        className
      )}
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      <div className="flex max-w-2xl flex-col items-center gap-6">
        <span
          className="font-mono text-[11px] tracking-widest uppercase"
          style={{ color: colorFront }}
        >
          {eyebrow}
        </span>
        <h1 className="font-heading text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
          {title}
        </h1>
        <p className="max-w-md text-base text-pretty text-white/70 sm:text-lg">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
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
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            {secondaryAction.label}
          </a>
        </div>
      </div>
      {/* The globe is centered on the bottom edge, so only its top half shows. */}
      <div className="pointer-events-none relative -z-10 h-[440px] w-full">
        <div className="absolute bottom-0 left-1/2 aspect-square w-[min(1100px,160%)] -translate-x-1/2 translate-y-1/2">
          <DitheringGlobeArcs
            aria-hidden
            className="size-full"
            arcs={arcs}
            colorBack={colorBack}
            colorFront={colorFront}
            colorArc={colorArc}
            scale={0.7}
          />
        </div>
      </div>
    </section>
  )
}

export { DitheringGlobeArcsHero }
