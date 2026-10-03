import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { DitheringGlobe } from "./dithering-globe"

type DitheringGlobeHeroProps = React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  colorBack?: string
  colorFront?: string
}

function DitheringGlobeHero({
  eyebrow = "Available in 190+ countries",
  title = "Built for every corner of the map",
  description = "A slowly turning, ordered-dither Earth rendered live on the GPU. Retro texture, real coastlines.",
  primaryAction = { label: "Start building", href: "#" },
  secondaryAction = { label: "Talk to sales", href: "#" },
  colorBack = "#000000",
  colorFront = "#38bdf8",
  className,
  style,
  ...props
}: DitheringGlobeHeroProps) {
  return (
    <section
      data-slot="dithering-globe-hero"
      className={cn(
        "dark relative isolate grid min-h-[640px] w-full overflow-hidden text-white md:grid-cols-2",
        className
      )}
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      <div className="flex flex-col justify-center gap-6 px-6 py-24 md:px-12 lg:px-16">
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
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            {secondaryAction.label}
          </a>
        </div>
      </div>
      <div className="relative min-h-80">
        <DitheringGlobe
          aria-hidden
          className="absolute inset-0 size-full"
          colorBack={colorBack}
          colorFront={colorFront}
        />
      </div>
    </section>
  )
}

export { DitheringGlobeHero }
