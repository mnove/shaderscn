"use client"

import * as React from "react"
import { Spiral } from "@paper-design/shaders-react"
import { ArrowRightIcon, CalendarPlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type SpiralLaunchCountdownProps = React.ComponentProps<"section"> & {
  /** When the launch starts. A date string or a Date. */
  launchAt: string | Date
  /** Name of the launch, used in calendar invites. */
  event?: string
  eyebrow?: string
  title?: string
  description?: string
  /** Where people watch the launch, e.g. a livestream. Also added to calendar invites. */
  liveAction?: { label: string; href: string }
  /** Replace the title and description once the launch has started. */
  liveTitle?: string
  liveDescription?: string
  /** Length of the launch event in calendar invites, in minutes. */
  duration?: number
  colorBack?: string
  colorFront?: string
  speed?: number
}

function SpiralLaunchCountdown({
  launchAt,
  event = "Acme 3.0 launch keynote",
  eyebrow = "Live keynote",
  title = "Acme 3.0 goes live in",
  description = "Join us for the first look at everything new. Add it to your calendar so you don't miss the start.",
  liveAction = { label: "Watch the keynote", href: "#" },
  liveTitle = "We're live",
  liveDescription = "The keynote has started. Grab a seat, we're streaming now.",
  duration = 60,
  colorBack = "#05030f",
  colorFront = "#7c6cff",
  speed = 0.4,
  className,
  style,
  ...props
}: SpiralLaunchCountdownProps) {
  const start = new Date(launchAt)
  const now = useNow()
  const live = now !== null && now >= start.getTime()
  const calendar = { event, start, duration, url: liveAction.href }

  return (
    <section
      data-slot="spiral-launch-countdown"
      className={cn(
        "dark relative isolate flex min-h-[720px] w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center text-white",
        className
      )}
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      <Spiral
        aria-hidden
        className="absolute inset-0 -z-10 size-full opacity-70"
        colorBack={colorBack}
        colorFront={colorFront}
        density={1}
        distortion={0}
        strokeWidth={0.15}
        strokeTaper={0}
        strokeCap={0}
        noise={0.15}
        noiseFrequency={0.3}
        softness={0.02}
        scale={1}
        // Spins faster once the launch is live.
        speed={live ? speed * 3 : speed}
      />
      {/* Darkens the middle of the spiral so the countdown stays readable. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(closest-side, ${colorBack} 35%, transparent)`,
        }}
      />
      <div className="flex w-full max-w-3xl flex-col items-center gap-8">
        <span className="flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 font-mono text-[11px] tracking-widest text-white/80 uppercase backdrop-blur">
          {live && (
            <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
          )}
          {live ? "Live now" : eyebrow}
        </span>
        <h2 className="font-heading text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
          {live ? liveTitle : title}
        </h2>
        {!live && <Countdown to={start} now={now} />}
        <p className="max-w-md text-base text-pretty text-white/70">
          {/* In the visitor's own time zone, known once mounted. */}
          {!live && now !== null && (
            <span className="block font-medium text-white">
              {launchDateFormat.format(start)}.
            </span>
          )}
          {live ? liveDescription : description}
        </p>
        {live ? (
          <a
            href={liveAction.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 bg-white px-5 text-black hover:bg-white/80"
            )}
          >
            {liveAction.label}
            <ArrowRightIcon />
          </a>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={getGoogleCalendarUrl(calendar)}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 bg-white px-5 text-black hover:bg-white/80"
              )}
            >
              <CalendarPlusIcon />
              Add to Google Calendar
            </a>
            <a
              href={`data:text/calendar;charset=utf-8,${encodeURIComponent(getIcs(calendar))}`}
              download="launch.ics"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 border-white/20 bg-white/5 px-5 backdrop-blur hover:bg-white/10"
              )}
            >
              Apple / Outlook (.ics)
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

/** The current time, ticking every second. Null until mounted, so the server and the first client render match. */
function useNow() {
  const [now, setNow] = React.useState<number | null>(null)

  React.useEffect(() => {
    const tick = () => setNow(Date.now())
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return now
}

const launchDateFormat = new Intl.DateTimeFormat(undefined, {
  dateStyle: "full",
  timeStyle: "short",
})

const UNITS = [
  ["Days", 86_400_000],
  ["Hours", 3_600_000],
  ["Minutes", 60_000],
  ["Seconds", 1_000],
] as const

function Countdown({ to, now }: { to: Date; now: number | null }) {
  const remaining = now === null ? 0 : to.getTime() - now
  // Each unit only counts what the larger units above it don't, e.g. 0–23 hours.
  const parts = UNITS.map(([label, ms], i) => ({
    label,
    value: Math.floor((i ? remaining % UNITS[i - 1][1] : remaining) / ms),
  }))

  return (
    <time
      dateTime={to.toISOString()}
      className="flex justify-center gap-4 sm:gap-8"
    >
      {parts.map(({ label, value }) => (
        <span key={label} className="flex flex-col items-center gap-2">
          <span className="min-w-[2ch] font-heading text-5xl leading-none tracking-tight tabular-nums sm:text-8xl">
            {now === null ? "--" : String(value).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
            {label}
          </span>
        </span>
      ))}
    </time>
  )
}

type CalendarEvent = {
  event: string
  start: Date
  duration: number
  url: string
}

// Calendar dates in UTC, like 20270601T090000Z.
function formatCalendarDate(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "")
}

function getGoogleCalendarUrl({ event, start, duration, url }: CalendarEvent) {
  const end = new Date(start.getTime() + duration * 60_000)
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event,
    dates: `${formatCalendarDate(start)}/${formatCalendarDate(end)}`,
    details: url,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

// A single-event iCalendar file, which Apple Calendar and Outlook can open.
function getIcs({ event, start, duration, url }: CalendarEvent) {
  const end = new Date(start.getTime() + duration * 60_000)
  const escape = (text: string) => text.replace(/([\\;,])/g, "\\$1")
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//shaderscn//launch countdown//EN",
    "BEGIN:VEVENT",
    `UID:${formatCalendarDate(start)}-${encodeURIComponent(event)}`,
    `DTSTAMP:${formatCalendarDate(start)}`,
    `DTSTART:${formatCalendarDate(start)}`,
    `DTEND:${formatCalendarDate(end)}`,
    `SUMMARY:${escape(event)}`,
    `URL:${url}`,
    `DESCRIPTION:${escape(url)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")
}

export { SpiralLaunchCountdown }
