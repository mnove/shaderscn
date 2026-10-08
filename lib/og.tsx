// The image renderer only understands plain <img>, not next/image.
/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"

// Shared renderer for the Open Graph images. Shaders are WebGL, which the
// image renderer can't run, so the cards use the static capture of the mark.

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

const fonts = Promise.all([
  readFile(path.join(process.cwd(), "assets/fonts/Merriweather-Regular.ttf")),
  readFile(path.join(process.cwd(), "assets/fonts/Inter-Regular.ttf")),
])

// A capture of the live mark on black, so the card's background is black too.
const mark = readFile(
  path.join(process.cwd(), "public/brand/mark.png"),
  "base64"
).then((data) => `data:image/png;base64,${data}`)

const MARK_SIZE = 440
const MARK_POSITION = {
  position: "absolute",
  top: (ogSize.height - MARK_SIZE) / 2,
  right: 24,
} as const

export async function renderOgImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description: string
}) {
  const [[merriweather, inter], markSrc] = await Promise.all([fonts, mark])

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        backgroundColor: "#000000",
        color: "#fafafa",
        fontFamily: "Inter",
      }}
    >
      {/* The capture fades to black at its edges, so it has no visible box. */}
      <img
        src={markSrc}
        alt=""
        width={MARK_SIZE}
        height={MARK_SIZE}
        style={MARK_POSITION}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img src={markSrc} alt="" width={36} height={36} />
        <span style={{ fontFamily: "Merriweather", fontSize: 32 }}>
          shaderscn
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 700,
        }}
      >
        {eyebrow && (
          <span
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "6px 14px",
              border: "1px solid rgba(250, 250, 250, 0.35)",
              fontSize: 22,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "rgba(250, 250, 250, 0.85)",
            }}
          >
            {eyebrow}
          </span>
        )}
        <span
          style={{
            fontFamily: "Merriweather",
            fontSize: title.length > 28 ? 64 : 80,
            lineHeight: 1.1,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: 30,
            lineHeight: 1.4,
            color: "rgba(250, 250, 250, 0.7)",
          }}
        >
          {description}
        </span>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Merriweather", data: merriweather, weight: 400 },
        { name: "Inter", data: inter, weight: 400 },
      ],
    }
  )
}
