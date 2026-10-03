import { PaperTexture } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

type Testimonial = {
  quote: string
  name: string
  role: string
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We replaced three landing page videos with a single shader. Pages got lighter and somehow feel more alive.",
    name: "Maya Lindqvist",
    role: "Design Lead, Northwind",
  },
  {
    quote: "Copy, paste, ship. That's the whole review.",
    name: "Daniel Okafor",
    role: "Frontend Engineer",
  },
  {
    quote:
      "Our hero section finally has some texture. Customers keep asking how we made it, and the honest answer is: we didn't, really.",
    name: "Priya Raman",
    role: "Founder, Loomly",
  },
  {
    quote:
      "The components read like code I'd write myself. No magic, just props.",
    name: "Tomás Herrera",
    role: "Staff Engineer, Fieldnote",
  },
  {
    quote:
      "I rebranded our marketing site in an afternoon by changing four color props.",
    name: "Hana Sato",
    role: "Brand Designer",
  },
  {
    quote:
      "Shaders always felt like a rabbit hole. These are the first ones I've used without opening a GLSL file.",
    name: "Lukas Brandt",
    role: "Indie Developer",
  },
  {
    quote: "Tasteful by default. Hard to make ugly, even when we tried.",
    name: "Amara Nwosu",
    role: "Product Designer, Kite",
  },
  {
    quote:
      "Performance was my worry. It renders on the GPU and our Lighthouse score didn't move.",
    name: "Ethan Cole",
    role: "Web Performance Engineer",
  },
  {
    quote:
      "The paper grain makes our quotes look like they were actually printed.",
    name: "Sofia Marchetti",
    role: "Editor, Folio",
  },
]

type TestimonialWallProps = React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  testimonials?: Testimonial[]
  /** Background color of the wall. */
  colorBack?: string
  /** Color of the cards. */
  colorCard?: string
  /** Text color. */
  colorInk?: string
  /** Strength of the paper grain, 0 to 1. */
  grain?: number
}

function TestimonialWall({
  eyebrow = "Wall of love",
  title = "Loved by people who ship",
  description = "Real words from teams using shaders on their sites. Every card carries a little paper grain.",
  testimonials = DEFAULT_TESTIMONIALS,
  colorBack = "#ebe6d9",
  colorCard = "#f8f5ee",
  colorInk = "#2b2a26",
  grain = 1,
  className,
  style,
  ...props
}: TestimonialWallProps) {
  return (
    <section
      data-slot="testimonial-wall"
      className={cn(
        "relative isolate flex w-full flex-col gap-12 overflow-hidden px-6 py-20 md:px-12 lg:px-16",
        className
      )}
      style={{ backgroundColor: colorBack, color: colorInk, ...style }}
      {...props}
    >
      <div className="flex max-w-2xl flex-col gap-4">
        <span className="font-mono text-[11px] tracking-widest uppercase opacity-60">
          {eyebrow}
        </span>
        <h2 className="font-heading text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-md text-base text-pretty opacity-70">
          {description}
        </p>
      </div>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="mb-4 flex break-inside-avoid flex-col gap-6 border border-current/10 p-6 shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
            style={{ backgroundColor: colorCard }}
          >
            <blockquote className="font-heading text-lg leading-snug text-pretty">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-[11px] uppercase"
                style={{ backgroundColor: colorInk, color: colorCard }}
              >
                {getInitials(testimonial.name)}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium">{testimonial.name}</span>
                <span className="text-xs opacity-60">{testimonial.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      {/*
        A single grain layer multiplied over the whole wall, so every card gets
        texture from one canvas no matter how many testimonials there are.
      */}
      <PaperTexture
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full mix-blend-multiply"
        style={{ opacity: grain }}
        colorBack="#ffffff"
        colorPaper="#ffffff"
        colorShadow="#d8d2c4"
        fit="cover"
        scale={1}
        blending={1}
        distortion={0}
        angle={0}
        seed={455}
        roughness={0.5}
        roughnessSize={0.3}
        roughnessRows={0}
        fiber={0.5}
        fiberSize={0.4}
        folds={0}
        wrinkles={0}
        crumples={0}
        drops={0}
      />
    </section>
  )
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
}

export { TestimonialWall, type Testimonial }
