"use client"

import * as React from "react"
import { Heatmap } from "@paper-design/shaders-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { MARK_FRAME, MARK_SHADER } from "@/components/site-mark"

/** The homepage hero's live shader: the shaderscn mark, glowing at full size. */
function HeroShader({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const light = resolvedTheme === "light"
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
    <div
      aria-hidden
      // Fades the canvas out at its edges, so its background never shows as a
      // box against the page.
      className={cn(
        "relative mask-[radial-gradient(closest-side,black_80%,transparent)]",
        className
      )}
    >
      {reducedMotion !== null && (
        <React.Suspense fallback={null}>
          <Heatmap
            {...MARK_SHADER}
            frame={MARK_FRAME}
            speed={reducedMotion ? 0 : 1}
            // On the page instead of a black tile, with room for the glow to
            // fade out before the edge, as in the heatmap hero. The coldest
            // colors are near black, which only reads as shadow on a dark
            // page, so the light theme drops them and matches the page white.
            colorBack={light ? "#ffffff" : "#00000000"}
            colors={light ? MARK_SHADER.colors.slice(2) : MARK_SHADER.colors}
            scale={4 / 7}
            className="absolute inset-0 size-full"
          />
        </React.Suspense>
      )}
    </div>
  )
}

export { HeroShader }
