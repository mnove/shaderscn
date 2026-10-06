import { FlutedGlass } from "@paper-design/shaders-react"
import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type FlutedGlassAppDownloadProps = React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  /**
   * A portrait screenshot of your app. It's shown on the phone and, through
   * fluted glass, behind it, so the section always matches the app's colors.
   * Remote images must be served with CORS headers.
   */
  screenshot?: string
  /** Leave a store out to hide its button. */
  appStoreHref?: string
  playStoreHref?: string
  rating?: { value: string; label: string }
  colorBack?: string
}

function FlutedGlassAppDownload({
  eyebrow = "Now on iOS and Android",
  title = "Your trips, in your pocket",
  description = "Plan the route, save the spots and keep every photo in one journal. Works offline, syncs when you're back.",
  screenshot = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&h=1950&fit=crop&q=80&fm=jpg",
  appStoreHref = "#",
  playStoreHref = "#",
  rating = { value: "4.9", label: "from 12,000+ ratings" },
  colorBack = "#0a0a0a",
  className,
  style,
  ...props
}: FlutedGlassAppDownloadProps) {
  return (
    <section
      data-slot="fluted-glass-app-download"
      className={cn(
        "dark relative isolate grid w-full overflow-hidden text-white md:min-h-[640px] md:grid-cols-2",
        className
      )}
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      <div className="flex flex-col justify-center gap-6 px-6 py-20 md:px-12 lg:px-16">
        <span className="font-mono text-[11px] tracking-widest text-white/60 uppercase">
          {eyebrow}
        </span>
        <h2 className="font-heading text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
          {title}
        </h2>
        <p className="max-w-md text-base text-pretty text-white/70 sm:text-lg">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {appStoreHref && (
            <StoreButton
              href={appStoreHref}
              icon={APPLE_ICON}
              caption="Download on the"
              store="App Store"
            />
          )}
          {playStoreHref && (
            <StoreButton
              href={playStoreHref}
              icon={GOOGLE_PLAY_ICON}
              caption="Get it on"
              store="Google Play"
            />
          )}
        </div>
        {rating && (
          <p className="flex items-center gap-2 text-sm text-white/60">
            <span className="flex text-amber-400" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} className="size-4 fill-current" />
              ))}
            </span>
            <span>
              <span className="font-medium text-white">{rating.value}</span>{" "}
              {rating.label}
            </span>
          </p>
        )}
      </div>
      <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden py-16">
        {/* The same screenshot, refracted through vertical glass flutes. */}
        <FlutedGlass
          aria-hidden
          className="absolute inset-0 -z-10 size-full"
          image={screenshot}
          colorBack={colorBack}
          colorShadow="#000000"
          colorHighlight="#ffffff"
          shape="lines"
          distortionShape="prism"
          size={0.6}
          distortion={0.6}
          blur={0.4}
          shadows={0.3}
          highlights={0.08}
          edges={0.25}
          fit="cover"
        />
        <PhoneMockup screenshot={screenshot} />
      </div>
    </section>
  )
}

function PhoneMockup({ screenshot }: { screenshot: string }) {
  return (
    <div className="relative aspect-9/19.5 w-60 rounded-[2.75rem] bg-neutral-950 p-2.5 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/15 sm:w-64">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={screenshot}
        alt="App screenshot"
        className="size-full rounded-[2.25rem] object-cover"
      />
      <span
        aria-hidden
        className="absolute top-5 left-1/2 h-6 w-20 -translate-x-1/2 rounded-full bg-black"
      />
    </div>
  )
}

function StoreButton({
  href,
  icon,
  caption,
  store,
}: {
  href: string
  icon: React.ReactNode
  caption: string
  store: string
}) {
  return (
    <a
      href={href}
      className="flex h-12 items-center gap-2.5 rounded-lg border border-white/20 bg-black px-4 transition-colors outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60"
    >
      {icon}
      <span className="flex flex-col text-left leading-none">
        <span className="text-[10px] text-white/70">{caption}</span>
        <span className="text-base font-medium">{store}</span>
      </span>
    </a>
  )
}

const APPLE_ICON = (
  <svg aria-hidden viewBox="0 0 24 24" className="size-6 fill-current">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
)

const GOOGLE_PLAY_ICON = (
  <svg aria-hidden viewBox="0 0 24 24" className="size-5 fill-current">
    <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
  </svg>
)

export { FlutedGlassAppDownload }
