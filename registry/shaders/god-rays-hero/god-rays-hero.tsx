import { GodRays } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type GodRaysHeroProps = React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
}

function GodRaysHero({
  eyebrow = "Now in public beta",
  title = "Light up your next launch",
  description = "Volumetric light rays rendered in real time on the GPU. No videos, no images, just a few kilobytes of shader code.",
  primaryAction = { label: "Get started", href: "#" },
  secondaryAction = { label: "Learn more", href: "#" },
  className,
  ...props
}: GodRaysHeroProps) {
  return (
    <section
      data-slot="god-rays-hero"
      className={cn(
        "dark relative isolate flex min-h-[640px] w-full items-center justify-center overflow-hidden bg-black px-6 py-24 text-white",
        className
      )}
      {...props}
    >
      <GodRays
        aria-hidden
        className="absolute inset-0 -z-10 size-full"
        offsetX={0}
        offsetY={-0.55}
        colorBack="#000000"
        colorBloom="#0000ff"
        colors={["#a600ff6e", "#6200fff0", "#ffffff", "#33fff5"]}
        density={0.3}
        spotty={0.3}
        midIntensity={0.4}
        midSize={0.2}
        intensity={0.8}
        bloom={0.4}
        speed={0.75}
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-black to-transparent" />
      <div className="flex max-w-2xl flex-col items-center gap-6 pt-24 text-center">
        <span className="border border-white/20 bg-white/5 px-3 py-1 font-mono text-[11px] tracking-widest text-white/80 uppercase backdrop-blur">
          {eyebrow}
        </span>
        <h1 className="font-heading text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
          {title}
        </h1>
        <p className="max-w-lg text-base text-pretty text-white/70 sm:text-lg">
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
    </section>
  )
}

export { GodRaysHero }
