import { Dithering, type DitheringProps } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type Dithering404Props = React.ComponentProps<"section"> & {
  code?: string
  title?: string
  description?: string
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  colorBack?: string
  colorFront?: string
  shape?: DitheringProps["shape"]
}

function Dithering404({
  code = "404",
  title = "Lost in the noise",
  description = "The page you're looking for drifted off somewhere. It may have moved, or it never existed at all.",
  primaryAction = { label: "Take me home", href: "/" },
  secondaryAction = { label: "Contact support", href: "#" },
  colorBack = "#000000",
  colorFront = "#a3e635",
  shape = "swirl",
  className,
  style,
  ...props
}: Dithering404Props) {
  return (
    <section
      data-slot="dithering-404"
      className={cn(
        "dark relative isolate flex min-h-svh w-full flex-col items-center justify-center overflow-hidden px-6 py-40 text-center text-white",
        className
      )}
      style={{ backgroundColor: colorBack, ...style }}
      {...props}
    >
      <Dithering
        aria-hidden
        className="absolute inset-0 -z-10 size-full"
        colorBack={colorBack}
        colorFront={colorFront}
        shape={shape}
        type="8x8"
        size={3}
        scale={1.2}
        speed={0.4}
      />
      {/* Darkens the middle of the swirl so the message stays readable. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(closest-side, ${colorBack} 25%, transparent)`,
        }}
      />
      <div className="flex max-w-xl flex-col items-center gap-6">
        <span
          className="font-mono text-[11px] tracking-widest uppercase"
          style={{ color: colorFront }}
        >
          Error {code}
        </span>
        <h1 className="font-heading text-[clamp(6rem,20vw,12rem)] leading-none tracking-tighter">
          {code}
        </h1>
        <h2 className="font-heading text-3xl tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-md text-base text-pretty text-white/70">
          {description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={primaryAction.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-white text-black hover:bg-white/80"
            )}
          >
            {primaryAction.label}
          </a>
          <a
            href={secondaryAction.href}
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            {secondaryAction.label}
          </a>
        </div>
      </div>
    </section>
  )
}

export { Dithering404 }
