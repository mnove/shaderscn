import { StaticRadialGradient } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

type Logo = {
  name: string
  /** Any image URL. Logos are shown in white, whatever their colors. */
  src: string
  href?: string
}

const DEFAULT_LOGOS: Logo[] = [
  {
    name: "Northwind",
    src: createLogo("Northwind", '<path d="M4 34 20 6l16 28H27l-7-12-7 12z"/>'),
  },
  {
    name: "Loomly",
    src: createLogo(
      "Loomly",
      '<circle cx="20" cy="20" r="11.5" fill="none" stroke="#000" stroke-width="7"/>'
    ),
  },
  {
    name: "Fieldnote",
    src: createLogo(
      "Fieldnote",
      '<path d="M6 7h28v7H6zm0 9.5h20v7H6zM6 26h12v7H6z"/>'
    ),
  },
  {
    name: "Kite",
    src: createLogo("Kite", '<path d="M20 4 35 20 20 36 5 20z"/>'),
  },
  {
    name: "Folio",
    src: createLogo("Folio", '<path d="M6 5h19l9 9v21H6z"/>'),
  },
  {
    name: "Arcline",
    src: createLogo(
      "Arcline",
      '<path d="M4 33a16 16 0 0 1 32 0h-8a8 8 0 0 0-16 0z"/>'
    ),
  },
]

type RadialGradientLogoCloudProps = React.ComponentProps<"section"> & {
  title?: string
  logos?: Logo[]
  /** Colors of the horizon, from its bright rim inwards. */
  colors?: string[]
  colorBack?: string
}

function RadialGradientLogoCloud({
  title = "Trusted by teams at",
  logos = DEFAULT_LOGOS,
  colors = ["#c7d2fe", "#6366f1", "#1e1b4b"],
  colorBack = "#000000",
  className,
  style,
  ...props
}: RadialGradientLogoCloudProps) {
  return (
    <section
      data-slot="radial-gradient-logo-cloud"
      className={cn(
        "dark relative isolate flex w-full flex-col items-center justify-center gap-10 overflow-hidden px-6 pt-24 pb-52 text-white",
        className
      )}
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      {/*
        A huge circle sitting below the section, so only the glowing top of it
        shows, like a planet's horizon. The canvas keeps a fixed shape so the
        curve looks the same at every section size.
      */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -z-10 aspect-3/1 w-[max(100%,64rem)] -translate-x-1/2"
      >
        <StaticRadialGradient
          className="size-full"
          // The gradient runs from the circle's edge to its center. Fading in
          // from the background softens the rim, and padding the end with the
          // background keeps the inside of the planet dark.
          colors={[colorBack, ...colors, ...Array(6).fill(colorBack)]}
          colorBack={colorBack}
          radius={1.6}
          offsetY={0.78}
          focalDistance={0}
          falloff={1}
          mixing={0.9}
          distortion={0}
          grainMixer={0}
          grainOverlay={0.1}
          fit="cover"
        />
      </div>
      <p className="font-mono text-[11px] tracking-widest text-white/50 uppercase">
        {title}
      </p>
      <ul className="flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {logos.map((logo) => {
          const image = (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo.src}
              alt={logo.name}
              className="h-7 w-auto brightness-0 invert"
            />
          )
          return (
            <li
              key={logo.src}
              className="opacity-60 transition-opacity hover:opacity-100"
            >
              {logo.href ? <a href={logo.href}>{image}</a> : image}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

// Placeholder wordmarks: a black mark followed by the name, as an SVG data URI.
function createLogo(name: string, mark: string) {
  const textWidth = name.length * 12.5
  const width = 46 + textWidth
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="40" viewBox="0 0 ${width} 40">${mark}<text x="46" y="29" textLength="${textWidth}" lengthAdjust="spacingAndGlyphs" font-family="Helvetica, Arial, sans-serif" font-size="25" font-weight="700">${name}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export { RadialGradientLogoCloud, type Logo }
