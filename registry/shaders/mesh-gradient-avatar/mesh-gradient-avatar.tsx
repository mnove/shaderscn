"use client"

import * as React from "react"
import { StaticMeshGradient } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

// Every avatar renders at this size, then gets scaled. Keeping it fixed lets
// avatars of different sizes share the same cached image.
const RENDER_SIZE = 128

// Browsers cap live WebGL contexts per page (around 16), so a long member list
// can't keep a canvas per avatar. Instead each avatar renders once, is saved
// as an image, and frees its context. Only a few render at the same time.
const MAX_RENDERING = 4

const cache = new Map<string, string>()
const queue: Array<() => void> = []
let rendering = 0

function acquireSlot() {
  if (rendering < MAX_RENDERING) {
    rendering++
    return Promise.resolve()
  }
  return new Promise<void>((resolve) => queue.push(resolve))
}

function releaseSlot() {
  const next = queue.shift()
  if (next) next()
  else rendering--
}

type MeshGradientAvatarProps = React.ComponentProps<"span"> & {
  /** Any stable string, like a user ID or email. The same seed always gives the same gradient. */
  seed: string
  /** Used as the accessible name. Leave it out for decorative avatars. */
  name?: string
  /** Diameter in px. */
  size?: number
  /** Override the colors picked from the seed. The shape still follows the seed. */
  colors?: string[]
}

function MeshGradientAvatar({
  seed,
  name,
  size = 40,
  colors,
  className,
  style,
  children,
  ...props
}: MeshGradientAvatarProps) {
  const params = getGradient(seed, colors)
  // Compared by value, so inline color arrays don't trigger a new render.
  const key = JSON.stringify(params)
  const [image, setImage] = React.useState<{ key: string; src: string }>()
  const src = image?.key === key ? image.src : cache.get(key)

  return (
    <span
      data-slot="mesh-gradient-avatar"
      role={name ? "img" : undefined}
      aria-label={name}
      aria-hidden={name ? undefined : true}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-cover",
        className
      )}
      style={{
        width: size,
        height: size,
        // A plain CSS gradient in the same colors shows until the shader is
        // ready, and is what the server renders.
        backgroundImage: src
          ? `url(${src})`
          : `linear-gradient(135deg, ${params.colors.join(", ")})`,
        ...style,
      }}
      {...props}
    >
      {!src && (
        <Snapshot
          key={key}
          params={params}
          scale={size / RENDER_SIZE}
          onRender={(src) => {
            cache.set(key, src)
            setImage({ key, src })
          }}
        />
      )}
      {children}
    </span>
  )
}

function Snapshot({
  params,
  scale,
  onRender,
}: {
  params: ReturnType<typeof getGradient>
  scale: number
  onRender: (src: string) => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [ready, setReady] = React.useState(false)

  // Wait for a free slot before mounting the shader.
  React.useEffect(() => {
    const element = ref.current
    let acquired = false
    let cancelled = false

    acquireSlot().then(() => {
      if (cancelled) return releaseSlot()
      acquired = true
      setReady(true)
    })

    return () => {
      cancelled = true
      if (!acquired) return
      // Unmounting doesn't free the context until it's garbage collected, so
      // drop it explicitly before handing the slot to the next avatar.
      element
        ?.querySelector("canvas")
        ?.getContext("webgl2")
        ?.getExtension("WEBGL_lose_context")
        ?.loseContext()
      releaseSlot()
    }
  }, [])

  // The shader mounts asynchronously, so poll until its canvas has been sized
  // and drawn, then save it as an image.
  React.useEffect(() => {
    if (!ready) return

    let frame = requestAnimationFrame(function check() {
      const canvas = ref.current?.querySelector("canvas")
      if (!canvas?.width) {
        frame = requestAnimationFrame(check)
        return
      }
      onRender(canvas.toDataURL("image/jpeg", 0.92))
    })

    return () => cancelAnimationFrame(frame)
  }, [ready, onRender])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 origin-top-left"
      style={{
        width: RENDER_SIZE,
        height: RENDER_SIZE,
        // Scale instead of resizing so the canvas always renders at
        // RENDER_SIZE, whatever size the avatar is shown at.
        transform: `scale(${scale})`,
      }}
    >
      {ready && (
        <StaticMeshGradient
          className="size-full"
          // Keeps the pixels around after drawing so they can be read back.
          webGlContextAttributes={{ preserveDrawingBuffer: true }}
          {...params}
        />
      )}
    </div>
  )
}

/** Picks colors and a shape from the seed, so the same seed always matches. */
function getGradient(seed: string, colors?: string[]) {
  const random = mulberry32(hash(seed))
  const hue = Math.floor(random() * 360)

  return {
    // Neighbouring hues only. Opposite hues blend into grey where they meet.
    colors: colors ?? [
      `hsl(${hue}, 90%, 58%)`,
      `hsl(${(hue + 30) % 360}, 95%, 64%)`,
      `hsl(${(hue + 60) % 360}, 90%, 72%)`,
      `hsl(${(hue + 100) % 360}, 85%, 62%)`,
    ],
    positions: Math.floor(random() * 100),
    waveX: random(),
    waveXShift: random(),
    waveY: random(),
    waveYShift: random(),
    rotation: Math.floor(random() * 360),
    mixing: 0.9,
    grainMixer: 0,
    grainOverlay: 0,
  }
}

// FNV-1a: turns the seed into a 32-bit number.
function hash(value: string) {
  let h = 0x811c9dc5
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

// A tiny seeded random number generator.
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export { MeshGradientAvatar }
