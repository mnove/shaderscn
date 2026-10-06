"use client"

import * as React from "react"
import { ImageDithering } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

type TeamMember = {
  name: string
  role: string
  /** Any image URL. Remote images must be served with CORS headers. */
  image: string
  href?: string
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    name: "Maya Lindqvist",
    role: "Co-founder, CEO",
    image: portrait("1534528741775-53994a69daeb"),
  },
  {
    name: "Daniel Okafor",
    role: "Co-founder, CTO",
    image: portrait("1507003211169-0a1dd7228f2d"),
  },
  {
    name: "Priya Raman",
    role: "Head of Design",
    image: portrait("1494790108377-be9c29b29330"),
  },
  {
    name: "Tomás Herrera",
    role: "Staff Engineer",
    image: portrait("1500648767791-00dcc994a43e"),
  },
  {
    name: "Hana Sato",
    role: "Brand Designer",
    image: portrait("1438761681033-6461ffad8d80"),
  },
  {
    name: "Lukas Brandt",
    role: "Product Engineer",
    image: portrait("1472099645785-5658abf4ff4e"),
  },
  {
    name: "Amara Nwosu",
    role: "Product Manager",
    image: portrait("1544005313-94ddf0286df2"),
  },
  {
    name: "Ethan Cole",
    role: "Infrastructure",
    image: portrait("1506794778202-cad84cf45f1d"),
  },
]

// Browsers cap live WebGL contexts per page (around 16), so a big team can't
// keep a canvas per photo. Instead each photo renders once, is saved as an
// image, and frees its context. Only a few render at the same time.
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

type DitherParams = {
  colorBack: string
  colorFront: string
  pixelSize: number
}

type ImageDitheringTeamProps = React.ComponentProps<"section"> &
  Partial<DitherParams> & {
    eyebrow?: string
    title?: string
    description?: string
    members?: TeamMember[]
    /** Background and text color of the section. */
    colorPaper?: string
    /** Text color of the section. */
    colorInk?: string
  }

function ImageDitheringTeam({
  eyebrow = "The team",
  title = "Small team, big screens",
  description = "Every photo goes through the same dither, so a dozen different cameras still look like one set. Hover a face to see the original.",
  members = DEFAULT_MEMBERS,
  colorPaper = "#f2f1e8",
  colorInk = "#1c1b18",
  colorBack = "#1c1b18",
  colorFront = "#f2f1e8",
  pixelSize = 2,
  className,
  style,
  ...props
}: ImageDitheringTeamProps) {
  return (
    <section
      data-slot="image-dithering-team"
      className={cn(
        "relative isolate flex w-full flex-col gap-12 px-6 py-20 md:px-12 lg:px-16",
        className
      )}
      style={{ backgroundColor: colorPaper, color: colorInk, ...style }}
      {...props}
    >
      <div className="flex max-w-2xl flex-col gap-4">
        <span className="font-mono text-[11px] tracking-widest uppercase opacity-60">
          {eyebrow}
        </span>
        <h2 className="font-heading text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-md text-base text-pretty opacity-70">
          {description}
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {members.map((member) => (
          <li key={member.name} className="group flex flex-col gap-3">
            <DitheredPhoto
              src={member.image}
              params={{ colorBack, colorFront, pixelSize }}
            />
            <div className="flex flex-col">
              <span className="font-medium">
                {member.href ? (
                  <a
                    href={member.href}
                    className="underline-offset-4 outline-none hover:underline focus-visible:underline"
                  >
                    {member.name}
                  </a>
                ) : (
                  member.name
                )}
              </span>
              <span className="text-sm opacity-60">{member.role}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

/**
 * The original photo, covered by its dithered version until hovered. Until
 * the dither is ready, or if it can't render, a grayscale photo shows instead.
 */
function DitheredPhoto({ src, params }: { src: string; params: DitherParams }) {
  // Compared by value, so inline params don't trigger a new render.
  const key = JSON.stringify([src, params])
  const [loaded, setLoaded] = React.useState<{
    src: string
    image: HTMLImageElement
  }>()
  const [snapshot, setSnapshot] = React.useState<{ key: string; url: string }>()
  const dithered = snapshot?.key === key ? snapshot.url : undefined

  // Load the photo with CORS so the shader can read its pixels. A photo that
  // fails just stays in grayscale.
  React.useEffect(() => {
    const element = new Image()
    element.crossOrigin = "anonymous"
    element.onload = () => setLoaded({ src, image: element })
    element.src = src
    return () => {
      element.onload = null
    }
  }, [src])

  React.useEffect(() => {
    if (!snapshot) return
    return () => URL.revokeObjectURL(snapshot.url)
  }, [snapshot])

  return (
    <div
      className="relative aspect-4/5 w-full overflow-hidden"
      style={{ backgroundColor: params.colorBack }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 size-full object-cover grayscale transition-[filter] duration-300 group-focus-within:grayscale-0 group-hover:grayscale-0"
      />
      {dithered && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={dithered}
          alt=""
          className="absolute inset-0 size-full object-cover transition-opacity duration-300 [image-rendering:pixelated] group-focus-within:opacity-0 group-hover:opacity-0"
        />
      )}
      {loaded?.src === src && !dithered && (
        <Snapshot
          key={key}
          image={loaded.image}
          params={params}
          onRender={(url) => setSnapshot({ key, url })}
        />
      )}
    </div>
  )
}

function Snapshot({
  image,
  params,
  onRender,
}: {
  image: HTMLImageElement
  params: DitherParams
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
      // drop it explicitly before handing the slot to the next photo.
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
  // canvas as an image. PNG keeps the dither pixels crisp.
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
        canvas.toBlob((blob) => {
          if (blob && !cancelled) handleRender(URL.createObjectURL(blob))
        }, "image/png")
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
    // Rendered in place at the photo's size, so dither pixels stay square.
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0"
    >
      {ready && (
        <ImageDithering
          className="size-full"
          // Keeps the pixels around after drawing so they can be read back.
          webGlContextAttributes={{ preserveDrawingBuffer: true }}
          image={image}
          colorBack={params.colorBack}
          colorFront={params.colorFront}
          colorHighlight={params.colorFront}
          size={params.pixelSize}
          type="8x8"
          colorSteps={1}
          fit="cover"
        />
      )}
    </div>
  )
}

function portrait(id: string) {
  return `https://images.unsplash.com/photo-${id}?w=600&h=750&fit=crop&crop=faces&q=80&fm=jpg`
}

export { ImageDitheringTeam, type TeamMember }
