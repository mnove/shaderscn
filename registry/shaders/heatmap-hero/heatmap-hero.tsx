"use client"

import * as React from "react"
import { Heatmap, type PaperShaderElement } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// A placeholder app mark: a bold four-point spark.
const DEFAULT_LOGO = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><path d="M100 0c8 56 36 84 100 100-64 16-92 44-100 100-8-56-36-84-100-100C64 84 92 56 100 0z"/></svg>'
)}`

type HeatmapHeroProps = React.ComponentProps<"section"> & {
  /**
   * A dark logo on a transparent background, like a black SVG. Bold, filled
   * shapes glow best. Remote images must be served with CORS headers.
   */
  logo?: string
  eyebrow?: string
  title?: string
  description?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  /** Heat colors, from coolest to hottest. */
  colors?: string[]
  colorBack?: string
  speed?: number
}

function HeatmapHero({
  logo = DEFAULT_LOGO,
  eyebrow = "Introducing Spark",
  title = "The app you've been waiting for",
  description = "Spark is here. Faster, smarter and a little bit warmer than anything you've used before.",
  primaryAction = { label: "Download for macOS", href: "#" },
  secondaryAction = { label: "Read the announcement", href: "#" },
  colors = [
    "#11206a",
    "#1f3ba2",
    "#2f63e7",
    "#6bd7ff",
    "#ffe679",
    "#ff991e",
    "#ff4c00",
  ],
  colorBack = "#000000",
  speed = 1,
  className,
  style,
  ...props
}: HeatmapHeroProps) {
  // The logo the browser has loaded. Only a loaded logo is handed to the
  // shader, so one that fails (e.g. missing CORS headers) just doesn't glow.
  const [loadedLogo, setLoadedLogo] = React.useState<string | null>(null)

  React.useEffect(() => {
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.onload = () => setLoadedLogo(logo)
    image.src = logo
    return () => {
      image.onload = null
    }
  }, [logo])

  return (
    <section
      data-slot="heatmap-hero"
      className={cn(
        "dark relative isolate flex min-h-[640px] w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center text-white",
        className
      )}
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      {/* Oversized so the glow can fade out, and pulled into the copy below. */}
      <div
        aria-hidden
        className="pointer-events-none -my-12 size-72 sm:-my-16 sm:size-96"
      >
        {loadedLogo === logo && (
          // Heatmap processes the logo before it can draw it, which suspends
          // until it's ready.
          <React.Suspense fallback={null}>
            <Glow logo={logo} colors={colors} speed={speed} />
          </React.Suspense>
        )}
      </div>
      <div className="relative flex max-w-2xl flex-col items-center gap-6">
        <span className="border border-white/20 bg-white/5 px-3 py-1 font-mono text-[11px] tracking-widest text-white/80 uppercase">
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

function Glow({
  logo,
  colors,
  speed,
}: {
  logo: string
  colors: string[]
  speed: number
}) {
  const ref = React.useRef<PaperShaderElement>(null)

  // Runs once the processed logo is on screen.
  React.useLayoutEffect(() => {
    ref.current?.animate(
      { opacity: [0, 1], scale: [0.96, 1] },
      { duration: 1200, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
    )
  }, [logo])

  return (
    <Heatmap
      ref={ref}
      className="size-full"
      image={logo}
      suspendWhenProcessingImage
      colors={colors}
      colorBack="#00000000"
      contour={0.5}
      angle={0}
      noise={0}
      innerGlow={0.5}
      outerGlow={0.5}
      // Heatmap pads the logo to leave room for the glow. Drawing it at 4/7
      // fits the padding on the canvas, so the glow fades out before the edge.
      scale={4 / 7}
      speed={speed}
    />
  )
}

export { HeatmapHero }
