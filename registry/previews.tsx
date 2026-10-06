import { ColorPanelsNewsletter } from "@/registry/shaders/color-panels-newsletter/color-panels-newsletter"
import { Dithering404 } from "@/registry/shaders/dithering-404/dithering-404"
import { DitheringFrameCard } from "@/registry/shaders/dithering-frame-card/dithering-frame-card"
import { DitheringGlobeArcsHero } from "@/registry/shaders/dithering-globe-arcs-hero/dithering-globe-arcs-hero"
import { DitheringGlobeHero } from "@/registry/shaders/dithering-globe-hero/dithering-globe-hero"
import { DitheringHero } from "@/registry/shaders/dithering-hero/dithering-hero"
import { DotGridBackground } from "@/registry/shaders/dot-grid-background/dot-grid-background"
import { FlutedGlassAppDownload } from "@/registry/shaders/fluted-glass-app-download/fluted-glass-app-download"
import { GodRaysHero } from "@/registry/shaders/god-rays-hero/god-rays-hero"
import { GrainGradientAuth } from "@/registry/shaders/grain-gradient-auth/grain-gradient-auth"
import { GrainGradientCard } from "@/registry/shaders/grain-gradient-card/grain-gradient-card"
import { HalftoneHero } from "@/registry/shaders/halftone-hero/halftone-hero"
import { HeatmapHero } from "@/registry/shaders/heatmap-hero/heatmap-hero"
import { ImageDitheringTeam } from "@/registry/shaders/image-dithering-team/image-dithering-team"
import { LensDistortionCard } from "@/registry/shaders/lens-distortion-card/lens-distortion-card"
import { LiquidMetalButton } from "@/registry/shaders/liquid-metal-button/liquid-metal-button"
import { LiquidMetalOrb } from "@/registry/shaders/liquid-metal-orb/liquid-metal-orb"
import { MeshGradientAvatar } from "@/registry/shaders/mesh-gradient-avatar/mesh-gradient-avatar"
import { MeshGradientBackground } from "@/registry/shaders/mesh-gradient-background/mesh-gradient-background"
import { MeshGradientFooter } from "@/registry/shaders/mesh-gradient-footer/mesh-gradient-footer"
import { NeuroNoiseStats } from "@/registry/shaders/neuro-noise-stats/neuro-noise-stats"
import { PulsingBorderCard } from "@/registry/shaders/pulsing-border-card/pulsing-border-card"
import { PulsingBorderPricing } from "@/registry/shaders/pulsing-border-pricing/pulsing-border-pricing"
import { RadialGradientLogoCloud } from "@/registry/shaders/radial-gradient-logo-cloud/radial-gradient-logo-cloud"
import { SimplexNoiseChangelog } from "@/registry/shaders/simplex-noise-changelog/simplex-noise-changelog"
import { SmokeRingWaitlist } from "@/registry/shaders/smoke-ring-waitlist/smoke-ring-waitlist"
import { SpiralLaunchCountdown } from "@/registry/shaders/spiral-launch-countdown/spiral-launch-countdown"
import { TestimonialWall } from "@/registry/shaders/testimonial-wall/testimonial-wall"
import { WarpCta } from "@/registry/shaders/warp-cta/warp-cta"
import { WaterCausticsHero } from "@/registry/shaders/water-caustics-hero/water-caustics-hero"
import { WavesBackground } from "@/registry/shaders/waves-background/waves-background"

import { AnnouncementBarDemo } from "@/components/announcement-bar-demo"
import { PulsingBorderPromptDemo } from "@/components/pulsing-border-prompt-demo"

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

const TEAM = [
  { name: "Maya Lindqvist", email: "maya@northwind.dev" },
  { name: "Daniel Okafor", email: "daniel@northwind.dev" },
  { name: "Priya Raman", email: "priya@northwind.dev" },
  { name: "Tomás Herrera", email: "tomas@northwind.dev" },
  { name: "Hana Sato", email: "hana@northwind.dev" },
]

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
  "heatmap-hero": {
    layout: "section",
    element: <HeatmapHero />,
    usage: `import { HeatmapHero } from "@/components/heatmap-hero"

export default function Page() {
  return (
    <HeatmapHero
      // A dark logo on a transparent background works best.
      logo="/logo.svg"
      eyebrow="Introducing Acme 2.0"
      title="Rebuilt from the ground up"
      primaryAction={{ label: "Get started", href: "/signup" }}
    />
  )
}`,
  },
  "fluted-glass-app-download": {
    layout: "section",
    element: <FlutedGlassAppDownload />,
    usage: `import { FlutedGlassAppDownload } from "@/components/fluted-glass-app-download"

export default function Page() {
  return (
    <FlutedGlassAppDownload
      title="Acme, now on your phone"
      // A portrait screenshot. It's also the backdrop, through fluted glass.
      screenshot="/screenshots/home.png"
      appStoreHref="https://apps.apple.com/app/id000000000"
      playStoreHref="https://play.google.com/store/apps/details?id=com.acme"
      rating={{ value: "4.8", label: "on the App Store" }}
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
  "color-panels-newsletter": {
    layout: "section",
    element: <ColorPanelsNewsletter />,
    usage: `// app/blog/page.tsx
import { ColorPanelsNewsletter } from "@/components/color-panels-newsletter"

import { subscribe } from "./actions"

export default function BlogPage() {
  return (
    <>
      <Posts />
      <ColorPanelsNewsletter
        title="Get new posts by email"
        onSubscribe={subscribe}
      />
    </>
  )
}

// app/blog/actions.ts
"use server"

export async function subscribe(email: string) {
  await resend.contacts.create({ email, audienceId: AUDIENCE_ID })
}`,
  },
  "pulsing-border-pricing": {
    layout: "section",
    element: <PulsingBorderPricing />,
    usage: `import { PulsingBorderPricing } from "@/components/pulsing-border-pricing"

export default function Page() {
  return (
    <PulsingBorderPricing
      defaultBilling="yearly"
      plans={[
        {
          name: "Pro",
          description: "For growing teams.",
          price: { monthly: 24, yearly: 19 },
          features: ["Unlimited projects", "Custom domains"],
          action: { label: "Start free trial", href: "/signup?plan=pro" },
          featured: true,
          badge: "Most popular",
        },
      ]}
    />
  )
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
  "image-dithering-team": {
    layout: "section",
    element: <ImageDitheringTeam />,
    usage: `import { ImageDitheringTeam } from "@/components/image-dithering-team"

export default function AboutPage() {
  return (
    <ImageDitheringTeam
      title="The people behind Acme"
      members={[
        {
          name: "Maya Lindqvist",
          role: "Co-founder, CEO",
          image: "/team/maya.jpg",
          href: "https://x.com/maya",
        },
        { name: "Daniel Okafor", role: "Co-founder, CTO", image: "/team/daniel.jpg" },
      ]}
      // Dark parts of each photo get colorBack, light parts colorFront.
      colorBack="#1e1b4b"
      colorFront="#e0e7ff"
    />
  )
}`,
  },
  "simplex-noise-changelog": {
    layout: "section",
    element: <SimplexNoiseChangelog />,
    usage: `import { SimplexNoiseChangelog } from "@/components/simplex-noise-changelog"

import { getReleases } from "@/lib/releases"

export default async function ChangelogPage() {
  const releases = await getReleases()

  return (
    <SimplexNoiseChangelog
      releases={releases.map((release) => ({
        version: release.version,
        date: release.publishedAt,
        title: release.title,
        description: release.summary,
        changes: release.changes, // [{ type: "new" | "improved" | "fixed", text }]
        href: \`/changelog/\${release.slug}\`,
      }))}
      // Your brand colors. Each cover shuffles them into its own shape.
      colors={["#052e16", "#16a34a", "#86efac", "#fef08a"]}
    />
  )
}`,
  },
  "radial-gradient-logo-cloud": {
    layout: "section",
    element: <RadialGradientLogoCloud />,
    usage: `import { RadialGradientLogoCloud } from "@/components/radial-gradient-logo-cloud"

export default function Page() {
  return (
    <RadialGradientLogoCloud
      title="Trusted by teams at"
      logos={[
        { name: "Acme", src: "/logos/acme.svg", href: "https://acme.com" },
        { name: "Globex", src: "/logos/globex.svg" },
        { name: "Initech", src: "/logos/initech.svg" },
      ]}
      colors={["#bae6fd", "#0ea5e9", "#082f49"]}
    />
  )
}`,
  },
  "neuro-noise-stats": {
    layout: "section",
    element: <NeuroNoiseStats />,
    usage: `import { NeuroNoiseStats } from "@/components/neuro-noise-stats"

export default function Page() {
  return (
    <NeuroNoiseStats
      title="Built for traffic you can't predict"
      stats={[
        { value: "10M+", label: "Requests a day" },
        { value: "99.99%", label: "Uptime" },
        { value: "48ms", label: "Median latency" },
        { value: "35", label: "Regions" },
      ]}
      colorMid="#7c3aed"
      colorFront="#f0abfc"
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
  "smoke-ring-waitlist": {
    layout: "section",
    element: <SmokeRingWaitlist launchDate="2027-06-01T09:00:00Z" />,
    usage: `// app/page.tsx
import { SmokeRingWaitlist } from "@/components/smoke-ring-waitlist"

import { joinWaitlist } from "./actions"

export default function Page() {
  return (
    <SmokeRingWaitlist
      brand="Acme"
      launchDate="2027-06-01T09:00:00Z"
      onJoin={joinWaitlist}
    />
  )
}

// app/actions.ts
"use server"

export async function joinWaitlist(email: string) {
  await db.waitlist.create({ data: { email } })
}`,
  },
  "spiral-launch-countdown": {
    layout: "section",
    element: <SpiralLaunchCountdown launchAt="2027-06-01T17:00:00Z" />,
    usage: `import { SpiralLaunchCountdown } from "@/components/spiral-launch-countdown"

export default function Page() {
  return (
    <SpiralLaunchCountdown
      launchAt="2027-06-01T17:00:00Z"
      event="Acme 3.0 launch keynote"
      title="Acme 3.0 goes live in"
      // Becomes the main button once the countdown reaches zero.
      liveAction={{ label: "Watch the keynote", href: "https://youtube.com/live/..." }}
      colorFront="#ff6a3d"
    />
  )
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
  "mesh-gradient-announcement-bar": {
    layout: "section",
    element: <AnnouncementBarDemo />,
    usage: `// app/layout.tsx
import { cookies } from "next/headers"

import { MeshGradientAnnouncementBar } from "@/components/mesh-gradient-announcement-bar"

import { dismissAnnouncement } from "./actions"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const dismissed = (await cookies()).has("series-a-dismissed")

  return (
    <>
      {!dismissed && (
        <MeshGradientAnnouncementBar
          message="We raised our Series A"
          action={{ label: "Read the post", href: "/blog/series-a" }}
          onDismiss={dismissAnnouncement}
        />
      )}
      {children}
    </>
  )
}

// app/actions.ts
"use server"

import { cookies } from "next/headers"

export async function dismissAnnouncement() {
  const cookieStore = await cookies()
  cookieStore.set("series-a-dismissed", "1", { maxAge: 60 * 60 * 24 * 90 })
}`,
  },
  "grain-gradient-auth": {
    layout: "section",
    element: <GrainGradientAuth />,
    usage: `// app/(auth)/sign-in/page.tsx
import { GrainGradientAuth } from "@/components/grain-gradient-auth"

export default function SignInPage() {
  return (
    <GrainGradientAuth brand="Acme" title="Welcome back">
      {/* Leave children out for the built-in form, or bring your own */}
      <SignInForm />
    </GrainGradientAuth>
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
  "pulsing-border-prompt": {
    layout: "component",
    element: <PulsingBorderPromptDemo />,
    usage: `"use client"

import { useChat } from "@ai-sdk/react"

import { PulsingBorderPrompt } from "@/components/pulsing-border-prompt"

export function Chat() {
  const { sendMessage, status, stop } = useChat()

  return (
    <PulsingBorderPrompt
      status={status}
      onStop={stop}
      accept="image/*,.pdf"
      modes={[
        { value: "fast", label: "Fast", colors: ["#22d3ee", "#3b82f6"] },
        { value: "think", label: "Think", colors: ["#d915ef", "#0dc1fd"] },
      ]}
      onSubmit={({ text, files, mode }) => {
        const fileList = new DataTransfer()
        files.forEach((file) => fileList.items.add(file))
        sendMessage({ text, files: fileList.files }, { body: { mode } })
      }}
    />
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
  "dithering-frame-card": {
    layout: "component",
    element: <DitheringFrameCard />,
    usage: `import { DitheringFrameCard } from "@/components/dithering-frame-card"

export default function Example() {
  return (
    <DitheringFrameCard
      title="Realtime collaboration"
      colorFront="#22d3ee"
      shape="ripple"
      frame={16}
    />
  )
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
  "mesh-gradient-avatar": {
    layout: "component",
    element: (
      <div className="flex w-full max-w-sm flex-col gap-6 border bg-card p-6 text-card-foreground">
        <div className="flex -space-x-2">
          {TEAM.map((member) => (
            <MeshGradientAvatar
              key={member.email}
              seed={member.email}
              name={member.name}
              size={36}
              className="ring-2 ring-card"
            />
          ))}
        </div>
        <ul className="flex flex-col gap-4">
          {TEAM.slice(0, 3).map((member) => (
            <li key={member.email} className="flex items-center gap-3">
              <MeshGradientAvatar seed={member.email} />
              <span className="flex flex-col">
                <span className="text-sm font-medium">{member.name}</span>
                <span className="text-xs text-muted-foreground">
                  {member.email}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    ),
    usage: `import { MeshGradientAvatar } from "@/components/mesh-gradient-avatar"

export function UserAvatar({ user }: { user: User }) {
  return user.image ? (
    <img src={user.image} alt={user.name} className="size-10 rounded-full" />
  ) : (
    <MeshGradientAvatar seed={user.id} name={user.name} size={40} />
  )
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
