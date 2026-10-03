"use client"

import * as React from "react"
import { LensDistortion } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

// The photo is zoomed in slightly so the radial smear near the card's edges
// still samples the image instead of running off it.
const ZOOM = 1.12

type LensDistortionCardProps = React.ComponentProps<"div"> & {
  /** Any image URL. Remote images must be served with CORS headers. */
  image?: string
  alt?: string
  eyebrow?: string
  title?: string
  /** How far the image smears away from the cursor, 0 to 1. */
  strength?: number
  /** Strength of the rainbow fringing in the smear, 0 to 1. */
  dispersion?: number
}

function LensDistortionCard({
  image = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&fm=jpg",
  alt = "A desert road leading through red rocks towards a mountain",
  eyebrow = "Field notes / 04",
  title = "Valley of Fire",
  strength = 0.35,
  dispersion = 0.5,
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: LensDistortionCardProps) {
  const [active, setActive] = React.useState(false)
  // Cursor position relative to the card, from 0 to 1 on each axis. It keeps
  // its last value after the cursor leaves so the effect fades out in place.
  const [lens, setLens] = React.useState({ x: 0.5, y: 0.5 })

  return (
    <div
      data-slot="lens-distortion-card"
      className={cn(
        "relative isolate aspect-4/5 w-full max-w-sm cursor-none overflow-hidden bg-neutral-900 text-white",
        className
      )}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setActive(true)
        setLens({
          x: (event.clientX - rect.left) / rect.width,
          y: (event.clientY - rect.top) / rect.height,
        })
        onPointerMove?.(event)
      }}
      onPointerLeave={(event) => {
        setActive(false)
        onPointerLeave?.(event)
      }}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={alt}
        crossOrigin="anonymous"
        className="absolute inset-0 -z-10 size-full object-cover"
        style={{ scale: ZOOM }}
      />
      {/*
        The shader always draws its lens at the center of its canvas. The canvas
        is twice the card's size and follows the cursor, while imageX / imageY
        pan the picture back so it stays aligned with the photo underneath.
      */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-0 left-0 -z-10 h-[200%] w-[200%] transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0"
        )}
        style={{ translate: `${(lens.x - 1) * 50}% ${(lens.y - 1) * 50}%` }}
      >
        <LensDistortion
          className="size-full"
          image={image}
          fit="cover"
          // Half the canvas, so the photo matches the card's size, then zoomed.
          scale={0.5 * ZOOM}
          imageX={(0.5 - lens.x) / ZOOM}
          imageY={(0.5 - lens.y) / ZOOM}
          lensBulge={0}
          lensCircle={0}
          count={24}
          spread={strength}
          perspective={1}
          bias={0}
          angle={0}
          dispersion={dispersion}
          dispersionShift={-1}
          dispersionColor={0.6}
          focusCenter={0.9}
          focusEdges={1}
          swirl={0}
          noise={0}
        />
      </div>
      <div className="pointer-events-none flex size-full flex-col justify-end gap-1 bg-linear-to-t from-black/70 via-black/0 to-black/0 p-6">
        <span className="font-mono text-[11px] tracking-widest text-white/70 uppercase">
          {eyebrow}
        </span>
        <h3 className="font-heading text-2xl leading-tight">{title}</h3>
      </div>
    </div>
  )
}

export { LensDistortionCard }
