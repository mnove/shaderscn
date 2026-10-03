import {
  HalftoneDots,
  type HalftoneDotsProps,
} from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type HalftoneHeroProps = React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  /** Any image URL. Remote images must be served with CORS headers. */
  image?: string
  colorBack?: string
  colorFront?: string
  type?: HalftoneDotsProps["type"]
  grid?: HalftoneDotsProps["grid"]
}

function HalftoneHero({
  eyebrow = "Issue 07 / Portraits",
  title = "Every face tells it in dots",
  description = "Drop in any photo and it's printed live on the GPU as halftone. Swap the ink and paper colors to match your brand.",
  primaryAction = { label: "Read the issue", href: "#" },
  secondaryAction = { label: "Subscribe", href: "#" },
  image = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80&fm=jpg",
  colorBack = "#f2f1e8",
  colorFront = "#2b2b2b",
  type = "gooey",
  grid = "hex",
  className,
  style,
  ...props
}: HalftoneHeroProps) {
  return (
    <section
      data-slot="halftone-hero"
      className={cn(
        "relative isolate grid min-h-[640px] w-full overflow-hidden md:grid-cols-2",
        className
      )}
      style={{ backgroundColor: colorBack, color: colorFront, ...style }}
      {...props}
    >
      <div className="flex flex-col justify-center gap-6 px-6 py-24 md:px-12 lg:px-16">
        <span className="font-mono text-[11px] tracking-widest uppercase opacity-60">
          {eyebrow}
        </span>
        <h1 className="font-heading text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
          {title}
        </h1>
        <p className="max-w-md text-base text-pretty opacity-70 sm:text-lg">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={primaryAction.href}
            className={cn(buttonVariants({ size: "lg" }), "hover:opacity-80")}
            style={{ backgroundColor: colorFront, color: colorBack }}
          >
            {primaryAction.label}
          </a>
          <a
            href={secondaryAction.href}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-current bg-transparent text-inherit hover:bg-current/5 hover:text-inherit"
            )}
          >
            {secondaryAction.label}
          </a>
        </div>
      </div>
      <div className="relative min-h-80">
        <HalftoneDots
          aria-hidden
          className="absolute inset-0 size-full"
          image={image}
          colorBack={colorBack}
          colorFront={colorFront}
          type={type}
          grid={grid}
          fit="cover"
          size={0.5}
          radius={1.25}
          contrast={0.4}
          grainMixer={0.2}
          grainOverlay={0.2}
          grainSize={0.5}
        />
      </div>
    </section>
  )
}

export { HalftoneHero }
