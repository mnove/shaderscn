"use client"

import * as React from "react"
import { PulsingBorder } from "@paper-design/shaders-react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// How far (in px) the glow bleeds outside the featured plan. Matches the gap
// between plans so it fades out right at the neighbouring cards.
const GLOW = 32

type Billing = "monthly" | "yearly"

type Plan = {
  name: string
  description: string
  /** A number is shown as a price per month. A string is shown as is. */
  price: Record<Billing, number | string>
  features: string[]
  action: { label: string; href: string }
  /** Wraps the plan in the pulsing glow. */
  featured?: boolean
  badge?: string
}

const DEFAULT_PLANS: Plan[] = [
  {
    name: "Hobby",
    description: "For side projects and trying things out.",
    price: { monthly: 0, yearly: 0 },
    features: [
      "1 project",
      "10k monthly visitors",
      "Basic analytics",
      "Community support",
    ],
    action: { label: "Start for free", href: "#" },
  },
  {
    name: "Pro",
    description: "For growing teams that ship every week.",
    price: { monthly: 24, yearly: 19 },
    features: [
      "Unlimited projects",
      "250k monthly visitors",
      "Advanced analytics",
      "Custom domains",
      "Priority email support",
    ],
    action: { label: "Start free trial", href: "#" },
    featured: true,
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced security needs.",
    price: { monthly: "Custom", yearly: "Custom" },
    features: [
      "Unlimited everything",
      "SSO and SCIM",
      "99.99% uptime SLA",
      "Dedicated success manager",
    ],
    action: { label: "Contact sales", href: "#" },
  },
]

type PulsingBorderPricingProps = React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  plans?: Plan[]
  currency?: string
  /** Shown next to the yearly option, e.g. "Save 20%". */
  yearlyNote?: string
  defaultBilling?: Billing
  colors?: string[]
  speed?: number
}

function PulsingBorderPricing({
  eyebrow = "Pricing",
  title = "Simple pricing that grows with you",
  description = "Start for free, upgrade when you need more. No hidden fees, cancel anytime.",
  plans = DEFAULT_PLANS,
  currency = "$",
  yearlyNote = "Save 20%",
  defaultBilling = "monthly",
  colors = ["#0dc1fd", "#d915ef", "#ff3f2ecc"],
  speed = 1,
  className,
  ...props
}: PulsingBorderPricingProps) {
  const [billing, setBilling] = React.useState(defaultBilling)

  return (
    <section
      data-slot="pulsing-border-pricing"
      className={cn(
        "relative flex w-full flex-col items-center gap-12 overflow-hidden bg-background px-6 py-24 text-foreground md:px-12",
        className
      )}
      {...props}
    >
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          {eyebrow}
        </span>
        <h2 className="font-heading text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-md text-base text-pretty text-muted-foreground">
          {description}
        </p>
        <div className="mt-2 flex border p-0.5">
          {(["monthly", "yearly"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={billing === option}
              onClick={() => setBilling(option)}
              className="flex h-8 items-center gap-2 px-3 text-xs font-medium text-muted-foreground capitalize transition-colors outline-none hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring aria-pressed:bg-foreground aria-pressed:text-background"
            >
              {option}
              {option === "yearly" && yearlyNote && (
                <span className="font-mono text-[10px] tracking-wider uppercase opacity-70">
                  {yearlyNote}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-3">
        {plans.map((plan) => {
          const card = (
            <PlanCard plan={plan} billing={billing} currency={currency} />
          )

          return plan.featured ? (
            <Glow key={plan.name} colors={colors} speed={speed}>
              {card}
            </Glow>
          ) : (
            <div key={plan.name} className="border">
              {card}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function PlanCard({
  plan,
  billing,
  currency,
}: {
  plan: Plan
  billing: Billing
  currency: string
}) {
  const price = plan.price[billing]
  const isNumber = typeof price === "number"

  return (
    <div className="flex h-full flex-col gap-8 bg-card p-6 text-card-foreground">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-heading text-lg leading-tight">{plan.name}</h3>
          {plan.badge && (
            <span className="border px-2 py-0.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              {plan.badge}
            </span>
          )}
        </div>
        <p className="min-h-10 text-sm text-muted-foreground">
          {plan.description}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="flex items-baseline gap-1">
          <span className="font-heading text-4xl tracking-tight tabular-nums">
            {isNumber ? `${currency}${price}` : price}
          </span>
          {isNumber && (
            <span className="text-sm text-muted-foreground">/ month</span>
          )}
        </p>
        <p className="h-4 text-xs text-muted-foreground">
          {isNumber && price > 0 && billing === "yearly" && "Billed yearly"}
        </p>
      </div>
      <a
        href={plan.action.href}
        className={cn(
          buttonVariants({
            size: "lg",
            variant: plan.featured ? "default" : "outline",
          }),
          "w-full"
        )}
      >
        {plan.action.label}
      </a>
      <ul className="flex flex-col gap-3 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Glow({
  colors,
  speed,
  children,
}: {
  colors: string[]
  speed: number
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width: width + GLOW * 2, height: height + GLOW * 2 })
    })
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  // The shader expresses margins as a fraction of the canvas, so convert the
  // pixel outset into fractions to keep the border glued to the card edges.
  const marginX = size.width ? GLOW / size.width : 0
  const marginY = size.height ? GLOW / size.height : 0

  return (
    <div ref={ref} className="relative isolate">
      {size.width > 0 && (
        <PulsingBorder
          aria-hidden
          className="pointer-events-none absolute -z-10"
          style={{ inset: -GLOW }}
          colors={colors}
          colorBack="#00000000"
          speed={speed}
          roundness={0}
          thickness={0.05}
          softness={0.75}
          intensity={0.3}
          bloom={0.3}
          spots={4}
          spotSize={0.5}
          pulse={0.2}
          smoke={0.3}
          smokeSize={0.5}
          scale={1}
          marginLeft={marginX}
          marginRight={marginX}
          marginTop={marginY}
          marginBottom={marginY}
        />
      )}
      {children}
    </div>
  )
}

export { PulsingBorderPricing, type Plan }
