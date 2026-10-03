import { Dithering, type DitheringProps } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type DitheringHeroProps = React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  colorBack?: string
  colorFront?: string
  shape?: DitheringProps["shape"]
}

function DitheringHero({
  eyebrow = "v2.0 / Out now",
  title = "Pixels with a point of view",
  description = "An ordered-dither sphere that slowly turns behind your headline. Retro texture, modern GPU.",
  primaryAction = { label: "Start building", href: "#" },
  secondaryAction = { label: "Read the docs", href: "#" },
  colorBack = "#000000",
  colorFront = "#00b2ff",
  shape = "sphere",
  className,
  ...props
}: DitheringHeroProps) {
  return (
    <section
      data-slot="dithering-hero"
      className={cn(
        "dark relative isolate grid min-h-[640px] w-full overflow-hidden text-white md:grid-cols-2",
        className
      )}
      style={{ backgroundColor: colorBack }}
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
        <Dithering
          aria-hidden
          className="absolute inset-0 size-full"
          colorBack={colorBack}
          colorFront={colorFront}
          shape={shape}
          type="4x4"
          size={2}
          scale={0.8}
          speed={0.6}
        />
      </div>
    </section>
  )
}

export { DitheringHero }
