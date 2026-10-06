"use client"

import * as React from "react"
import { SimplexNoise } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

type ChangeType = "new" | "improved" | "fixed"

type Release = {
  version: string
  /** ISO date, like "2026-09-30". */
  date: string
  title: string
  description?: string
  changes?: { type: ChangeType; text: string }[]
  /** A cover image. Leave it out to get one generated from the version. */
  image?: string
  href?: string
}

const DEFAULT_RELEASES: Release[] = [
  {
    version: "3.2",
    date: "2026-09-30",
    title: "Shared workspaces",
    description:
      "Invite your whole team to a workspace, with roles, shared templates and one bill.",
    changes: [
      { type: "new", text: "Workspaces with owner, editor and viewer roles" },
      { type: "new", text: "Templates shared across a workspace" },
      { type: "improved", text: "Search is up to 4× faster on large projects" },
      { type: "fixed", text: "Exports no longer drop the last page" },
    ],
  },
  {
    version: "3.1",
    date: "2026-08-12",
    title: "Offline mode",
    description:
      "Keep working on the train. Changes sync the moment you're back online.",
    changes: [
      { type: "new", text: "Full offline editing on desktop and mobile" },
      { type: "improved", text: "Conflicts are merged line by line" },
      { type: "fixed", text: "Dark mode flashing on first load" },
    ],
  },
  {
    version: "3.0",
    date: "2026-06-24",
    title: "A faster, calmer editor",
    description:
      "Rebuilt from the ground up. Opens instantly, even with thousands of pages.",
    changes: [
      { type: "new", text: "A brand new editor engine" },
      { type: "new", text: "Command menu for everything" },
      { type: "improved", text: "Startup time down from 2.1s to 300ms" },
    ],
  },
]

const CHANGE_LABELS: Record<ChangeType, string> = {
  new: "New",
  improved: "Improved",
  fixed: "Fixed",
}

// Dates are formatted in UTC with a fixed locale, so the server and the
// browser always agree.
const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
})

type SimplexNoiseChangelogProps = React.ComponentProps<"section"> & {
  title?: string
  description?: string
  releases?: Release[]
  /**
   * Colors of the generated covers. Every cover uses the same colors, in a
   * different order and shape picked from its version.
   */
  colors?: string[]
}

function SimplexNoiseChangelog({
  title = "Changelog",
  description = "New features, improvements and fixes, shipped every few weeks.",
  releases = DEFAULT_RELEASES,
  colors = ["#1e1b4b", "#4f46e5", "#22d3ee", "#f472b6", "#fde68a"],
  className,
  ...props
}: SimplexNoiseChangelogProps) {
  return (
    <section
      data-slot="simplex-noise-changelog"
      className={cn(
        "flex w-full flex-col gap-16 bg-background px-6 py-20 text-foreground md:px-12 lg:px-16",
        className
      )}
      {...props}
    >
      <div className="flex max-w-2xl flex-col gap-4">
        <h2 className="font-heading text-4xl leading-tight tracking-tight sm:text-6xl">
          {title}
        </h2>
        <p className="max-w-md text-base text-pretty text-muted-foreground">
          {description}
        </p>
      </div>
      <ol className="flex flex-col">
        {releases.map((release) => (
          <li
            key={release.version}
            className="grid gap-4 border-t py-12 md:grid-cols-[12rem_1fr] md:gap-10"
          >
            <div className="flex items-center gap-3 md:sticky md:top-8 md:flex-col md:items-start md:self-start">
              <time
                dateTime={release.date}
                className="text-sm text-muted-foreground"
              >
                {dateFormat.format(new Date(release.date))}
              </time>
              <span className="border px-2 py-0.5 font-mono text-xs">
                v{release.version}
              </span>
            </div>
            <article className="flex max-w-2xl flex-col gap-5">
              <div className="relative aspect-2/1 w-full overflow-hidden border">
                {release.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={release.image}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <GeneratedCover version={release.version} colors={colors} />
                )}
              </div>
              <h3 className="font-heading text-2xl tracking-tight">
                {release.href ? (
                  <a
                    href={release.href}
                    className="underline-offset-4 hover:underline"
                  >
                    {release.title}
                  </a>
                ) : (
                  release.title
                )}
              </h3>
              {release.description && (
                <p className="text-pretty text-muted-foreground">
                  {release.description}
                </p>
              )}
              {release.changes && (
                <ul className="flex flex-col gap-2.5 text-sm">
                  {release.changes.map((change) => (
                    <li key={change.text} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-px w-18 shrink-0 border px-1.5 py-0.5 text-center font-mono text-[10px] tracking-wider uppercase",
                          change.type === "new" &&
                            "border-foreground bg-foreground text-background"
                        )}
                      >
                        {CHANGE_LABELS[change.type]}
                      </span>
                      {change.text}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}

/**
 * A cover drawn from the version number, so every release gets its own art
 * and the same version always gets the same cover.
 */
function GeneratedCover({
  version,
  colors,
}: {
  version: string
  colors: string[]
}) {
  const params = getCover(version, colors)
  // Compared by value, so inline color arrays don't trigger a new render.
  const key = JSON.stringify(params)
  const [snapshot, setSnapshot] = React.useState<{ key: string; url: string }>()
  const src = snapshot?.key === key ? snapshot.url : undefined

  React.useEffect(() => {
    if (!snapshot) return
    return () => URL.revokeObjectURL(snapshot.url)
  }, [snapshot])

  return (
    <div
      className="absolute inset-0 bg-cover"
      style={{
        // A plain CSS gradient in the same colors shows until the shader is
        // ready, and is what the server renders.
        backgroundImage: src
          ? `url(${src})`
          : `linear-gradient(135deg, ${params.colors.join(", ")})`,
      }}
    >
      {!src && (
        <Snapshot
          key={key}
          params={params}
          onRender={(url) => setSnapshot({ key, url })}
        />
      )}
      <span className="absolute bottom-4 left-5 font-heading text-6xl leading-none tracking-tight text-white [text-shadow:0_2px_24px_rgb(0_0_0/0.35)] sm:text-8xl">
        {version}
      </span>
    </div>
  )
}

// Browsers cap live WebGL contexts per page (around 16), so a long changelog
// can't keep a canvas per cover. Instead each cover renders once, is saved as
// an image, and frees its context. Only a few render at the same time.
const MAX_RENDERING = 4

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

function Snapshot({
  params,
  onRender,
}: {
  params: ReturnType<typeof getCover>
  onRender: (url: string) => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [ready, setReady] = React.useState(false)
  const handleRender = React.useEffectEvent(onRender)

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
      // drop it explicitly before handing the slot to the next cover.
      element
        ?.querySelector("canvas")
        ?.getContext("webgl2")
        ?.getExtension("WEBGL_lose_context")
        ?.loseContext()
      releaseSlot()
    }
  }, [])

  // The shader mounts asynchronously, so poll until it exists. It draws when
  // its resize observer first fires, and observers run in the order they were
  // created, so one added now fires right after that first draw. Then save the
  // canvas as an image.
  React.useEffect(() => {
    if (!ready) return

    let cancelled = false
    let observer: ResizeObserver | undefined
    let frame = requestAnimationFrame(function check() {
      const shader = ref.current?.querySelector("[data-paper-shader]")
      const canvas = shader?.querySelector("canvas")
      if (!shader || !canvas) {
        frame = requestAnimationFrame(check)
        return
      }
      observer = new ResizeObserver(() => {
        observer?.disconnect()
        canvas.toBlob(
          (blob) => {
            if (blob && !cancelled) handleRender(URL.createObjectURL(blob))
          },
          "image/jpeg",
          0.92
        )
      })
      observer.observe(shader)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [ready])

  return (
    // Rendered in place at the cover's size, then hidden behind the gradient.
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0"
    >
      {ready && (
        <SimplexNoise
          className="size-full"
          // Keeps the pixels around after drawing so they can be read back.
          webGlContextAttributes={{ preserveDrawingBuffer: true }}
          {...params}
        />
      )}
    </div>
  )
}

/** Picks the color order and shape from the version, so it always matches. */
function getCover(version: string, colors: string[]) {
  const random = mulberry32(hash(version))
  const shuffled = [...colors]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return {
    colors: shuffled,
    // A paused moment of the animation. Each one is a different shape.
    frame: Math.floor(random() * 1_000_000),
    speed: 0,
    stepsPerColor: 2,
    softness: 0,
    scale: 0.4 + random() * 0.4,
    rotation: Math.floor(random() * 360),
  }
}

// FNV-1a: turns the version into a 32-bit number.
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

export { SimplexNoiseChangelog, type Release }
