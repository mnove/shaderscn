"use client"

import * as React from "react"
import { SmokeRing } from "@paper-design/shaders-react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type SmokeRingWaitlistProps = React.ComponentProps<"section"> & {
  brand?: string
  eyebrow?: string
  title?: string
  description?: string
  /** Social proof shown under the form. */
  note?: string
  /** Shows a live countdown until this date. Hidden once it has passed. */
  launchDate?: string | Date
  /**
   * Called with the email when someone joins. Throw to show an error. Works
   * with server actions.
   */
  onJoin?: (email: string) => void | Promise<void>
  colors?: string[]
  colorBack?: string
  speed?: number
}

function SmokeRingWaitlist({
  brand = "Acme",
  eyebrow = "Launching soon",
  title = "Something new is on its way",
  description = "We're putting the finishing touches on it. Join the waitlist and be the first to get access.",
  note = "Join 2,400+ people already on the list.",
  launchDate,
  onJoin,
  colors = ["#c4b5fd", "#818cf8", "#4f46e5"],
  colorBack = "#000000",
  speed = 0.5,
  className,
  style,
  ...props
}: SmokeRingWaitlistProps) {
  const [state, setState] = React.useState<
    "idle" | "pending" | "joined" | "error"
  >("idle")
  const [email, setEmail] = React.useState("")

  return (
    <section
      data-slot="smoke-ring-waitlist"
      className={cn(
        "dark relative isolate flex min-h-svh w-full flex-col items-center justify-center overflow-hidden px-6 py-32 text-center text-white",
        className
      )}
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      <SmokeRing
        aria-hidden
        className="absolute inset-0 -z-10 size-full"
        colors={colors}
        colorBack={colorBack}
        noiseScale={2.5}
        noiseIterations={6}
        radius={0.62}
        thickness={0.35}
        innerShape={1.2}
        scale={1}
        speed={speed}
      />
      {/* Darkens the inside of the ring so the copy stays readable. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(closest-side, ${colorBack} 45%, transparent)`,
        }}
      />
      <span className="absolute top-8 left-1/2 -translate-x-1/2 font-heading text-lg tracking-tight">
        {brand}
      </span>
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <span className="border border-white/20 bg-white/5 px-3 py-1 font-mono text-[11px] tracking-widest text-white/80 uppercase backdrop-blur">
          {eyebrow}
        </span>
        <h1 className="font-heading text-4xl leading-[1.05] tracking-tight text-balance sm:text-6xl">
          {title}
        </h1>
        <p className="max-w-md text-base text-pretty text-white/70">
          {description}
        </p>
        {launchDate && <Countdown to={launchDate} />}
        {state === "joined" ? (
          <p
            role="status"
            className="flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-3 text-sm backdrop-blur"
          >
            <CheckIcon className="size-4 shrink-0" />
            You&apos;re on the list. We&apos;ll email {email} when we launch.
          </p>
        ) : (
          <form
            className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
            onSubmit={async (event) => {
              event.preventDefault()
              setState("pending")
              try {
                await onJoin?.(email)
                setState("joined")
              } catch {
                setState("error")
              }
            }}
          >
            <Input
              type="email"
              name="email"
              autoComplete="email"
              aria-label="Email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-10 bg-black/40 text-sm backdrop-blur md:text-sm"
            />
            <Button
              type="submit"
              size="lg"
              disabled={state === "pending"}
              className="h-10 bg-white px-4 text-black hover:bg-white/80"
            >
              {state === "pending" ? "Joining…" : "Join the waitlist"}
            </Button>
          </form>
        )}
        {state === "error" ? (
          <p role="alert" className="text-xs text-red-400">
            Something went wrong. Please try again.
          </p>
        ) : (
          state !== "joined" &&
          note && <p className="text-xs text-white/50">{note}</p>
        )}
      </div>
    </section>
  )
}

const UNITS = [
  ["Days", 86_400_000],
  ["Hours", 3_600_000],
  ["Min", 60_000],
  ["Sec", 1_000],
] as const

function Countdown({ to }: { to: string | Date }) {
  const target = new Date(to).getTime()
  // Unknown until mounted, so the server and the first client render match.
  const [now, setNow] = React.useState<number | null>(null)

  React.useEffect(() => {
    const tick = () => setNow(Date.now())
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  if (now !== null && now >= target) return null

  const remaining = now === null ? 0 : target - now
  // Each unit only counts what the larger units above it don't, e.g. 0–23 hours.
  const parts = UNITS.map(([label, ms], i) => ({
    label,
    value: Math.floor((i ? remaining % UNITS[i - 1][1] : remaining) / ms),
  }))

  return (
    <time
      dateTime={new Date(target).toISOString()}
      className="grid grid-cols-4 gap-px border border-white/10 bg-white/10 font-mono"
    >
      {parts.map(({ label, value }) => (
        <span
          key={label}
          className="flex min-w-16 flex-col gap-1 bg-black/60 px-3 py-2 backdrop-blur"
        >
          <span className="text-xl text-white tabular-nums">
            {now === null ? "--" : String(value).padStart(2, "0")}
          </span>
          <span className="text-[10px] tracking-widest text-white/50 uppercase">
            {label}
          </span>
        </span>
      ))}
    </time>
  )
}

export { SmokeRingWaitlist }
