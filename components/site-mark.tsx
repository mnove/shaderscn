"use client"

import * as React from "react"
import { Heatmap } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

/** The heatmap hero's glowing spark. */
const MARK_SHADER = {
  image: "/brand/spark.svg",
  suspendWhenProcessingImage: true,
  colors: [
    "#11206a",
    "#1f3ba2",
    "#2f63e7",
    "#6bd7ff",
    "#ffe679",
    "#ff991e",
    "#ff4c00",
  ],
  colorBack: "#000000",
  contour: 0.5,
  angle: 0,
  noise: 0,
  innerGlow: 0.5,
  outerGlow: 0.5,
  scale: 0.8,
}

// The static images (`public/brand/mark*.png`, the favicon and app icons) are
// captures of this frame, so the live mark starts from the same picture.
const MARK_FRAME = 3200

/**
 * The shaderscn mark. Shows the static capture until the shader has processed
 * the spark, and stays static for reduced motion.
 */
function SiteMark({ className }: { className?: string }) {
  // Null until mounted: the shader only runs in the browser.
  const [reducedMotion, setReducedMotion] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return (
    <span
      aria-hidden
      className={cn("relative block overflow-hidden bg-black", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/mark-64.png"
        alt=""
        className="absolute inset-0 size-full"
      />
      {reducedMotion === false && (
        <React.Suspense fallback={null}>
          <Heatmap
            {...MARK_SHADER}
            frame={MARK_FRAME}
            className="absolute inset-0 size-full"
          />
        </React.Suspense>
      )}
    </span>
  )
}

export { MARK_FRAME, MARK_SHADER, SiteMark }
