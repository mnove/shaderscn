"use client"

import * as React from "react"
import { ColorPanels } from "@paper-design/shaders-react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ColorPanelsNewsletterProps = React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  /** Small print shown under the form. */
  note?: string
  /**
   * Called with the email when someone subscribes. Throw to show an error.
   * Works with server actions.
   */
  onSubscribe?: (email: string) => void | Promise<void>
  colors?: string[]
  speed?: number
}

function ColorPanelsNewsletter({
  eyebrow = "Newsletter",
  title = "Stay in the loop",
  description = "One email a month with new components, behind-the-scenes notes and nothing else.",
  note = "No spam. Unsubscribe anytime.",
  onSubscribe,
  colors = ["#00cfff", "#ff2d55", "#34c759", "#af52de"],
  speed = 0.4,
  className,
  ...props
}: ColorPanelsNewsletterProps) {
  const [state, setState] = React.useState<
    "idle" | "pending" | "subscribed" | "error"
  >("idle")
  const [email, setEmail] = React.useState("")

  return (
    <section
      data-slot="color-panels-newsletter"
      className={cn(
        "flex w-full flex-col justify-center px-6 py-12",
        className
      )}
      {...props}
    >
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden border bg-card text-card-foreground md:grid-cols-[1fr_20rem]">
        <div className="flex flex-col gap-5 p-8 sm:p-10">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              {eyebrow}
            </span>
            <h2 className="font-heading text-2xl leading-tight tracking-tight text-balance sm:text-3xl">
              {title}
            </h2>
            <p className="max-w-md text-sm text-pretty text-muted-foreground">
              {description}
            </p>
          </div>
          {state === "subscribed" ? (
            <p
              role="status"
              className="flex w-fit items-center gap-2 border bg-muted/50 px-4 py-3 text-sm"
            >
              <CheckIcon className="size-4 shrink-0" />
              Thanks! Check {email} to confirm your subscription.
            </p>
          ) : (
            <form
              className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
              onSubmit={async (event) => {
                event.preventDefault()
                setState("pending")
                try {
                  await onSubscribe?.(email)
                  setState("subscribed")
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
                className="h-10 text-sm md:text-sm"
              />
              <Button
                type="submit"
                size="lg"
                disabled={state === "pending"}
                className="h-10 px-4"
              >
                {state === "pending" ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
          )}
          {state === "error" ? (
            <p role="alert" className="text-xs text-destructive">
              Something went wrong. Please try again.
            </p>
          ) : (
            state !== "subscribed" &&
            note && <p className="text-xs text-muted-foreground">{note}</p>
          )}
        </div>
        {/*
          The panels are drawn on a transparent background, so they pick up the
          card color and work in both light and dark themes.
        */}
        <div
          aria-hidden
          className="relative min-h-44 border-t md:border-t-0 md:border-l"
        >
          <ColorPanels
            className="absolute inset-0 size-full"
            colors={colors}
            colorBack="#00000000"
            angle1={0.3}
            angle2={0.3}
            length={1}
            edges
            blur={0.25}
            fadeIn={0.85}
            fadeOut={0.3}
            density={1.6}
            rotation={112}
            scale={0.85}
            speed={speed}
          />
        </div>
      </div>
    </section>
  )
}

export { ColorPanelsNewsletter }
