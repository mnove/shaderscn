import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"

// Shared renderer for the Open Graph images. Shaders are WebGL, which the
// image renderer can't run, so the cards are typographic with a CSS gradient
// standing in for the header's mesh gradient.

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

const fonts = Promise.all([
  readFile(path.join(process.cwd(), "assets/fonts/Merriweather-Regular.ttf")),
  readFile(path.join(process.cwd(), "assets/fonts/Inter-Regular.ttf")),
])

// The header logo's MeshGradient colors.
const GRADIENT = [
  "radial-gradient(circle at 88% 12%, #f75092 0%, transparent 42%)",
  "radial-gradient(circle at 70% 85%, #9f50d3 0%, transparent 48%)",
  "radial-gradient(circle at 100% 70%, #241d9a 0%, transparent 55%)",
  "radial-gradient(circle at 60% 30%, rgba(224, 234, 255, 0.35) 0%, transparent 40%)",
].join(", ")

export async function renderOgImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description: string
}) {
  const [merriweather, inter] = await fonts

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        backgroundColor: "#09090b",
        backgroundImage: GRADIENT,
        color: "#fafafa",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 36,
            height: 36,
            backgroundImage:
              "linear-gradient(135deg, #e0eaff 0%, #9f50d3 45%, #f75092 70%, #241d9a 100%)",
          }}
        />
        <span style={{ fontFamily: "Merriweather", fontSize: 32 }}>
          shaderscn
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 860,
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
