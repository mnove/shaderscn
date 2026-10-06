import { NeuroNoise } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

type Stat = {
  value: string
  label: string
}

const DEFAULT_STATS: Stat[] = [
  { value: "10M+", label: "API requests served every day" },
  { value: "99.99%", label: "Uptime over the last 12 months" },
  { value: "48ms", label: "Median response time worldwide" },
  { value: "35", label: "Edge regions on six continents" },
]

type NeuroNoiseStatsProps = React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  stats?: Stat[]
  colorBack?: string
  /** Color of the network's glow. */
  colorMid?: string
  /** Color of the brightest fibers. */
  colorFront?: string
  speed?: number
}

function NeuroNoiseStats({
  eyebrow = "By the numbers",
  title = "Infrastructure you can stop thinking about",
  stats = DEFAULT_STATS,
  colorBack = "#02040f",
  colorMid = "#2563eb",
  colorFront = "#a5f3fc",
  speed = 0.4,
  className,
  style,
  ...props
}: NeuroNoiseStatsProps) {
  return (
    <section
      data-slot="neuro-noise-stats"
      className={cn(
        "dark relative isolate flex w-full flex-col gap-14 overflow-hidden px-6 py-20 text-white md:px-12 lg:px-16",
        className
      )}
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      {/*
        A glowing web of fibers, like traffic moving through a network. It
        fades out towards the title so the headline stays easy to read.
      */}
      <NeuroNoise
        aria-hidden
        className="absolute inset-0 -z-10 size-full mask-t-from-30% mask-t-to-95% opacity-70"
        colorBack={colorBack}
        colorMid={colorMid}
        colorFront={colorFront}
        brightness={0.05}
        contrast={0.4}
        speed={speed}
        scale={0.8}
      />
      <div className="flex max-w-2xl flex-col gap-4">
        <span
          className="font-mono text-[11px] tracking-widest uppercase"
          style={{ color: colorFront }}
        >
          {eyebrow}
        </span>
        <h2 className="font-heading text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
      </div>
      <dl className="grid grid-cols-2 border-t border-white/10 lg:grid-cols-4">
        {stats.map((stat) => (
          // The label comes first for screen readers, the number first on screen.
          <div
            key={stat.label}
            className="flex flex-col-reverse justify-end gap-2 border-white/10 py-8 pr-6 not-first:border-l not-first:pl-6 max-lg:nth-3:border-l-0 max-lg:nth-3:pl-0 max-lg:nth-[n+3]:border-t"
          >
            <dt className="max-w-48 text-sm text-pretty text-white/60">
              {stat.label}
            </dt>
            <dd className="font-heading text-4xl tracking-tight tabular-nums sm:text-6xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export { NeuroNoiseStats, type Stat }
