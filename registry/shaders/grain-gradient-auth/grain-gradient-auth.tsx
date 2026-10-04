import {
  GrainGradient,
  type GrainGradientProps,
} from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type GrainGradientAuthProps = React.ComponentProps<"section"> & {
  brand?: string
  quote?: { text: string; name: string; role: string }
  title?: string
  description?: string
  colors?: string[]
  colorBack?: string
  shape?: GrainGradientProps["shape"]
  speed?: number
}

function GrainGradientAuth({
  brand = "Acme",
  quote = {
    text: "We moved our whole team over in a weekend. It's the first tool in years that nobody complained about.",
    name: "Maya Lindqvist",
    role: "Design Lead, Northwind",
  },
  title = "Welcome back",
  description = "Sign in to your account to continue.",
  colors = ["#7300ff", "#eba8ff", "#00bfff", "#2b00ff"],
  colorBack = "#000000",
  shape = "corners",
  speed = 0.6,
  className,
  children,
  ...props
}: GrainGradientAuthProps) {
  return (
    <section
      data-slot="grain-gradient-auth"
      className={cn(
        "grid min-h-svh w-full bg-background text-foreground lg:grid-cols-2",
        className
      )}
      {...props}
    >
      <div className="dark relative isolate flex min-h-48 flex-col justify-between gap-12 overflow-hidden p-8 text-white lg:p-12">
        <GrainGradient
          aria-hidden
          className="absolute inset-0 -z-10 size-full"
          colors={colors}
          colorBack={colorBack}
          shape={shape}
          softness={0.7}
          intensity={0.2}
          noise={0.4}
          speed={speed}
        />
        {/* Darkens the bottom so the quote stays readable on bright colors. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-black/70 to-transparent"
        />
        <span className="font-heading text-lg tracking-tight">{brand}</span>
        <figure className="hidden max-w-md flex-col gap-4 lg:flex">
          <blockquote className="font-heading text-2xl leading-snug text-pretty">
            “{quote.text}”
          </blockquote>
          <figcaption className="flex flex-col text-sm">
            <span className="font-medium">{quote.name}</span>
            <span className="text-white/60">{quote.role}</span>
          </figcaption>
        </figure>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-3xl tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {children ?? <SignInForm />}
        </div>
      </div>
    </section>
  )
}

function SignInForm() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3">
        <a href="#" className={cn(buttonVariants({ variant: "outline" }))}>
          Google
        </a>
        <a href="#" className={cn(buttonVariants({ variant: "outline" }))}>
          GitHub
        </a>
      </div>
      <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Sign in
        </Button>
      </form>
      <p className="text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a
          href="#"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  )
}

export { GrainGradientAuth }
