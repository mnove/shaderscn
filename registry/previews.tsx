import { Dithering404 } from "@/registry/shaders/dithering-404/dithering-404"
import { DitheringGlobeArcsHero } from "@/registry/shaders/dithering-globe-arcs-hero/dithering-globe-arcs-hero"
import { DitheringGlobeHero } from "@/registry/shaders/dithering-globe-hero/dithering-globe-hero"
import { DitheringHero } from "@/registry/shaders/dithering-hero/dithering-hero"
import { DotGridBackground } from "@/registry/shaders/dot-grid-background/dot-grid-background"
import { GodRaysHero } from "@/registry/shaders/god-rays-hero/god-rays-hero"
import { GrainGradientCard } from "@/registry/shaders/grain-gradient-card/grain-gradient-card"
import { HalftoneHero } from "@/registry/shaders/halftone-hero/halftone-hero"
import { LensDistortionCard } from "@/registry/shaders/lens-distortion-card/lens-distortion-card"
import { LiquidMetalButton } from "@/registry/shaders/liquid-metal-button/liquid-metal-button"
import { LiquidMetalOrb } from "@/registry/shaders/liquid-metal-orb/liquid-metal-orb"
import { MeshGradientBackground } from "@/registry/shaders/mesh-gradient-background/mesh-gradient-background"
import { MeshGradientFooter } from "@/registry/shaders/mesh-gradient-footer/mesh-gradient-footer"
import { PulsingBorderCard } from "@/registry/shaders/pulsing-border-card/pulsing-border-card"
import { TestimonialWall } from "@/registry/shaders/testimonial-wall/testimonial-wall"
import { WarpCta } from "@/registry/shaders/warp-cta/warp-cta"
import { WaterCausticsHero } from "@/registry/shaders/water-caustics-hero/water-caustics-hero"
import { WavesBackground } from "@/registry/shaders/waves-background/waves-background"

/**
 * How an item is laid out in the site previews.
 * - section: full-width page section, rendered at desktop width
 * - component: centered on a neutral canvas at its natural size
 * - background: stretched to fill the whole preview
 */
export type PreviewLayout = "section" | "component" | "background"

type Preview = {
  layout: PreviewLayout
  element: React.ReactNode
  usage: string
}

export const previews: Record<string, Preview> = {
  "god-rays-hero": {
    layout: "section",
    element: <GodRaysHero />,
    usage: `import { GodRaysHero } from "@/components/god-rays-hero"

export default function Page() {
  return <GodRaysHero title="Light up your next launch" />
}`,
  },
  "dithering-hero": {
    layout: "section",
    element: <DitheringHero />,
    usage: `import { DitheringHero } from "@/components/dithering-hero"

export default function Page() {
  return <DitheringHero colorFront="#00b2ff" shape="sphere" />
}`,
  },
  "dithering-globe-hero": {
    layout: "section",
    element: <DitheringGlobeHero />,
    usage: `import { DitheringGlobeHero } from "@/components/dithering-globe-hero"

export default function Page() {
  return <DitheringGlobeHero colorFront="#38bdf8" />
}`,
  },
  "dithering-globe-arcs-hero": {
    layout: "section",
    element: <DitheringGlobeArcsHero />,
    usage: `import { DitheringGlobeArcsHero } from "@/components/dithering-globe-arcs-hero"

export default function Page() {
  return (
    <DitheringGlobeArcsHero
      arcs={[
        { from: [37.77, -122.42], to: [51.51, -0.13] }, // San Francisco → London
        { from: [51.51, -0.13], to: [35.68, 139.69] }, // London → Tokyo
      ]}
    />
  )
}`,
  },
  "halftone-hero": {
    layout: "section",
    element: <HalftoneHero />,
    usage: `import { HalftoneHero } from "@/components/halftone-hero"

export default function Page() {
  return <HalftoneHero image="/team.jpg" colorFront="#1e3a8a" type="classic" />
}`,
  },
  "water-caustics-hero": {
    layout: "section",
    element: <WaterCausticsHero />,
    usage: `import { WaterCausticsHero } from "@/components/water-caustics-hero"

export default function Page() {
  return (
    <WaterCausticsHero
      title="Your summer, slowed down"
      colorBack="#0b7a8f"
    />
  )
}`,
  },
  "warp-cta": {
    layout: "section",
    element: <WarpCta />,
    usage: `import { WarpCta } from "@/components/warp-cta"

export default function Page() {
  return <WarpCta action={{ label: "Get started", href: "/signup" }} />
}`,
  },
  "testimonial-wall": {
    layout: "section",
    element: <TestimonialWall />,
    usage: `import { TestimonialWall } from "@/components/testimonial-wall"

export default function Page() {
  return (
    <TestimonialWall
      testimonials={[
        {
          quote: "It just works.",
          name: "Ada Lovelace",
          role: "Engineer",
        },
      ]}
    />
  )
}`,
  },
  "dithering-404": {
    layout: "section",
    element: <Dithering404 />,
    usage: `// app/not-found.tsx
import { Dithering404 } from "@/components/dithering-404"

export default function NotFound() {
  return <Dithering404 colorFront="#a3e635" shape="swirl" />
}`,
  },
  "mesh-gradient-footer": {
    layout: "section",
    element: <MeshGradientFooter />,
    usage: `import { MeshGradientFooter } from "@/components/mesh-gradient-footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MeshGradientFooter
        wordmark="Acme"
        colors={["#00f5d4", "#00bbf9", "#9b5de5", "#f15bb5"]}
      />
    </>
  )
}`,
  },
  "mesh-gradient-background": {
    layout: "background",
    element: (
      <MeshGradientBackground className="flex size-full items-center justify-center">
        <p className="font-heading text-4xl text-white">Hello, gradient.</p>
      </MeshGradientBackground>
    ),
    usage: `import { MeshGradientBackground } from "@/components/mesh-gradient-background"

export default function Page() {
  return (
    <MeshGradientBackground className="flex min-h-svh items-center justify-center">
      <h1 className="text-4xl text-white">Hello, gradient.</h1>
    </MeshGradientBackground>
  )
}`,
  },
  "dot-grid-background": {
    layout: "background",
    element: (
      <DotGridBackground className="flex size-full flex-col items-center justify-center gap-3 text-center">
        <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">
          Developer platform
        </span>
        <p className="font-heading text-4xl text-white">Ship on a grid.</p>
      </DotGridBackground>
    ),
    usage: `import { DotGridBackground } from "@/components/dot-grid-background"

export default function Page() {
  return (
    <DotGridBackground className="flex min-h-svh items-center justify-center">
      <h1 className="text-4xl text-white">Ship on a grid.</h1>
    </DotGridBackground>
  )
}`,
  },
  "waves-background": {
    layout: "background",
    element: (
      <WavesBackground className="flex size-full flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="font-mono text-[11px] tracking-widest text-emerald-400 uppercase">
          Treasury API
        </span>
        <p className="max-w-xl font-heading text-4xl leading-tight text-balance text-white sm:text-5xl">
          Move money at the speed of the market
        </p>
        <div className="flex flex-wrap justify-center gap-px border border-white/10 bg-white/10 font-mono text-xs">
          {[
            ["Settled today", "$4.21B"],
            ["Avg. payout", "1.8s"],
            ["Uptime", "99.99%"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col gap-1 bg-[#050b16] px-5 py-3"
            >
              <span className="text-[10px] tracking-widest text-white/50 uppercase">
                {label}
              </span>
              <span className="text-base text-white tabular-nums">{value}</span>
            </div>
          ))}
        </div>
      </WavesBackground>
    ),
    usage: `import { WavesBackground } from "@/components/waves-background"

export default function Page() {
  return (
    <WavesBackground className="flex min-h-svh items-center justify-center">
      <h1 className="text-5xl text-white">Move money at market speed</h1>
    </WavesBackground>
  )
}`,
  },
  "pulsing-border-card": {
    layout: "component",
    element: <PulsingBorderCard />,
    usage: `import { PulsingBorderCard } from "@/components/pulsing-border-card"

export default function Example() {
  return (
    <PulsingBorderCard>
      <p>Anything you put in here glows.</p>
    </PulsingBorderCard>
  )
}`,
  },
  "grain-gradient-card": {
    layout: "component",
    element: <GrainGradientCard />,
    usage: `import { GrainGradientCard } from "@/components/grain-gradient-card"

export default function Example() {
  return <GrainGradientCard title="Golden hour" shape="wave" />
}`,
  },
  "liquid-metal-orb": {
    layout: "component",
    element: <LiquidMetalOrb />,
    usage: `import { LiquidMetalOrb } from "@/components/liquid-metal-orb"

export default function Example() {
  return <LiquidMetalOrb size={240} shape="circle" />
}`,
  },
  "lens-distortion-card": {
    layout: "component",
    element: <LensDistortionCard />,
    usage: `import { LensDistortionCard } from "@/components/lens-distortion-card"

export default function Example() {
  return (
    <LensDistortionCard
      image="/photos/coast.jpg"
      alt="Waves breaking on a rocky coast"
      title="Big Sur"
    />
  )
}`,
  },
  "liquid-metal-button": {
    layout: "component",
    element: (
      <LiquidMetalButton className="h-14 text-base">
        Get started
      </LiquidMetalButton>
    ),
    usage: `import { LiquidMetalButton } from "@/components/liquid-metal-button"

export default function Example() {
  return <LiquidMetalButton type="submit">Get started</LiquidMetalButton>
}`,
  },
}
