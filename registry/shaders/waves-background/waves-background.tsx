"use client"

import * as React from "react"
import { Waves, type PaperShaderElement } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

const SCALE = 3
// How fast the waves drift, in CSS pixels per second.
const DRIFT_SPEED = 40

type WavesBackgroundProps = React.ComponentProps<"div"> & {
  colorBack?: string
  /** Line color. Use a translucent color to keep the waves subtle. */
  colorFront?: string
  /** How often the waves crest. Lower values give longer, gentler waves. */
  frequency?: number
  /** Height of the crests. */
  amplitude?: number
  /** Distance between lines. */
  spacing?: number
  /** Line thickness. Around 0.01 gives hairlines. */
  thickness?: number
  /** Angle of the waves, in degrees. */
  rotation?: number
  /** Fade the waves out towards the top of the container. */
  fade?: boolean
  /** Let the waves drift slowly. Always off when the user prefers reduced motion. */
  animate?: boolean
}

function WavesBackground({
  colorBack = "#050b16",
  colorFront = "#34d39999",
  frequency = 0.1,
  amplitude = 0.8,
  spacing = 0.2,
  thickness = 0.012,
  rotation = -8,
  fade = true,
  animate = true,
  className,
  children,
  style,
  ...props
}: WavesBackgroundProps) {
  const ref = React.useRef<PaperShaderElement>(null)

  // Paper's Waves shader is static, so drift it by moving its offset uniforms
  // directly every frame, without re-rendering React.
  React.useEffect(() => {
    const element = ref.current
    if (!element || !animate) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // The wave shape repeats every (4 / frequency) pattern units, so wrapping
    // the distance at one period keeps the loop seamless and the numbers small.
    const period = frequency > 0 ? (100 * SCALE) / frequency : Infinity
    const angle = (rotation * Math.PI) / 180
    let size = { width: 0, height: 0 }
    let distance = 0
    let lastTime = 0
    let frame: number | null = null

    const tick = (time: number) => {
      distance = (distance + ((time - lastTime) / 1000) * DRIFT_SPEED) % period
      lastTime = time
      if (size.width && size.height) {
        // Offsets are in fractions of the canvas and get rotated with the
        // pattern, so counter-rotate them to move along the waves.
        element.paperShaderMount?.setUniforms({
          u_offsetX: (-Math.cos(angle) * distance) / size.width,
          u_offsetY: (-Math.sin(angle) * distance) / size.height,
        })
      }
      frame = requestAnimationFrame(tick)
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize[0]
      size = { width: box.inlineSize, height: box.blockSize }
    })
    resizeObserver.observe(element)

    // Only animate while the background is on screen.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && frame === null) {
        lastTime = performance.now()
        frame = requestAnimationFrame(tick)
      } else if (!entry.isIntersecting && frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
      }
    })
    intersectionObserver.observe(element)

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [animate, frequency, rotation])

  return (
    <div
      data-slot="waves-background"
      className={cn("relative isolate overflow-hidden", className)}
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      <Waves
        ref={ref}
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 size-full",
          fade && "mask-t-from-20% mask-t-to-90%"
        )}
        colorBack="#00000000"
        colorFront={colorFront}
        // Between a sine and an irregular wave, so lines read like price curves.
        shape={2.5}
        frequency={frequency}
        amplitude={amplitude}
        spacing={spacing}
        proportion={thickness}
        softness={0}
        rotation={rotation}
        scale={SCALE}
      />
      {children}
    </div>
  )
}

export { WavesBackground }
