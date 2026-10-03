import { Warp, type WarpProps } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type WarpCtaProps = React.ComponentProps<"section"> & {
  title?: string
  description?: string
  action?: { label: string; href: string }
  colors?: string[]
  shape?: WarpProps["shape"]
}

function WarpCta({
  title = "Ready when you are",
  description = "Ship a call to action that actually moves. Swap the colors to match your brand in seconds.",
  action = { label: "Create an account", href: "#" },
  colors = ["#121212", "#9470ff", "#121212", "#8838ff"],
  shape = "checks",
  className,
  ...props
}: WarpCtaProps) {
  return (
    <section
      data-slot="warp-cta"
      className={cn(
        "flex w-full flex-col justify-center px-6 py-16",
        className
      )}
      {...props}
    >
      <div className="dark relative isolate mx-auto flex max-w-5xl flex-col items-start gap-6 overflow-hidden bg-black px-8 py-16 text-white sm:px-12 md:flex-row md:items-end md:justify-between">
        <Warp
          aria-hidden
          className="absolute inset-0 -z-10 size-full"
          colors={colors}
          shape={shape}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shapeScale={0.1}
          speed={1}
        />
        <div className="flex max-w-lg flex-col gap-3">
          <h2 className="font-heading text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
            {title}
          </h2>
          <p className="text-base text-pretty text-white/70">{description}</p>
        </div>
        <a
          href={action.href}
          className={cn(
            buttonVariants({ size: "lg" }),
            "shrink-0 bg-white text-black hover:bg-white/80"
          )}
        >
          {action.label}
        </a>
      </div>
    </section>
  )
}

export { WarpCta }
