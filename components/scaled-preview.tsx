"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders children inside a fixed virtual viewport and scales it down to fit
 * the available width, so a desktop-sized section can be shown as a thumbnail.
 *
 * It scales with CSS `zoom` rather than a transform. Shaders size their canvas
 * from layout, which ignores transforms, so a transformed thumbnail would still
 * render every frame at full desktop resolution.
 *
 * Children only mount while the preview is near the viewport. Browsers cap the
 * number of live WebGL contexts per page (around 16), so a grid of shader
 * thumbnails would otherwise start losing its oldest canvases.
 */
function ScaledPreview({
  width,
  height,
  className,
  children,
}: {
  width: number
  height: number
  className?: string
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState<number | null>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const resizeObserver = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / width)
    })
    resizeObserver.observe(element)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) releaseWebGLContexts(element)
        setInView(entry.isIntersecting)
      },
      { rootMargin: "200px 0px" }
    )
    intersectionObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [width])

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {scale !== null && inView && (
        <div
          inert
          className="pointer-events-none absolute top-0 left-0"
          style={{ width, height, zoom: scale }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

// Unmounting a canvas doesn't free its context until it's garbage collected,
// so drop the contexts explicitly before the shaders unmount.
function releaseWebGLContexts(element: HTMLElement) {
  element.querySelectorAll("canvas").forEach((canvas) => {
    canvas
      .getContext("webgl2")
      ?.getExtension("WEBGL_lose_context")
      ?.loseContext()
  })
}

export { ScaledPreview }
