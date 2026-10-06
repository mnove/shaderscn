"use client"

import * as React from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import { ArrowRightIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type MeshGradientAnnouncementBarProps = React.ComponentProps<"div"> & {
  /** A short tag before the message, like "New". */
  badge?: string
  message?: string
  /** The whole bar links here. */
  action?: { label: string; href: string }
  /** Show a close button. The bar hides itself when it's clicked. */
  dismissible?: boolean
  /** Called when the bar is closed. Use it to remember the choice, e.g. in a cookie. */
  onDismiss?: () => void
  /** Keep them dark enough for white text. */
  colors?: string[]
  speed?: number
}

function MeshGradientAnnouncementBar({
  badge = "News",
  message = "We raised our $24M Series A",
  action = { label: "Read the announcement", href: "#" },
  dismissible = true,
  onDismiss,
  colors = ["#1e1b4b", "#4338ca", "#7e22ce", "#be185d"],
  speed = 0.4,
  className,
  style,
  ...props
}: MeshGradientAnnouncementBarProps) {
  const [dismissed, setDismissed] = React.useState(false)
  const [reducedMotion, setReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  if (dismissed) return null

  return (
    <div
      data-slot="mesh-gradient-announcement-bar"
      className={cn(
        "dark relative isolate flex min-h-10 w-full items-center justify-center overflow-hidden px-12 py-2 text-sm text-white",
        className
      )}
      style={{ backgroundColor: colors[0], ...style }}
      {...props}
    >
      <MeshGradient
        aria-hidden
        className="absolute inset-0 -z-10 size-full"
        colors={colors}
        distortion={0.8}
        swirl={0.2}
        grainOverlay={0.15}
        speed={reducedMotion ? 0 : speed}
        // Stretch the pattern along the bar, so the colors flow from side to
        // side instead of a few blobs squeezed into a thin strip.
        fit="none"
        worldWidth={1600}
        worldHeight={200}
      />
      <p className="flex min-w-0 items-center gap-3">
        {badge && (
          <span className="shrink-0 rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase ring-1 ring-white/25 ring-inset">
            {badge}
          </span>
        )}
        <span className="truncate font-medium">{message}</span>
        <a
          href={action.href}
          className="group/action inline-flex shrink-0 items-center gap-1 text-white/75 outline-none after:absolute after:inset-0 hover:text-white focus-visible:text-white focus-visible:after:ring-2 focus-visible:after:ring-white/60 focus-visible:after:ring-inset"
        >
          <span className="max-sm:sr-only">{action.label}</span>
          <ArrowRightIcon className="size-3.5 transition-transform group-hover/action:translate-x-0.5" />
        </a>
      </p>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss announcement"
          className="absolute top-1/2 right-3 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-white/70 outline-none hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60"
          onClick={() => {
            setDismissed(true)
            onDismiss?.()
          }}
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  )
}

export { MeshGradientAnnouncementBar }
