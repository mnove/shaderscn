import { MeshGradient } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

type FooterColumn = {
  title: string
  links: { label: string; href: string }[]
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Support", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
]

type MeshGradientFooterProps = React.ComponentProps<"footer"> & {
  wordmark?: string
  description?: string
  columns?: FooterColumn[]
  copyright?: string
  /** Colors of the gradient that fills the wordmark. */
  colors?: string[]
  /** Brightness of the gradient in the wordmark, 0 to 1. Keep it low so the footer stays calm. */
  intensity?: number
  speed?: number
}

function MeshGradientFooter({
  wordmark = "Lumen",
  description = "Light, motion and color for the web. Built on the GPU, shipped as copy-paste components.",
  columns = DEFAULT_COLUMNS,
  copyright = `© ${new Date().getFullYear()} Lumen, Inc. All rights reserved.`,
  colors = ["#ff6b35", "#f72585", "#7209b7", "#4cc9f0"],
  intensity = 0.35,
  speed = 0.3,
  className,
  ...props
}: MeshGradientFooterProps) {
  return (
    <footer
      data-slot="mesh-gradient-footer"
      className={cn(
        "dark flex w-full flex-col overflow-hidden bg-black text-white",
        className
      )}
      {...props}
    >
      <div className="grid gap-12 px-6 pt-20 pb-12 md:grid-cols-[1.5fr_repeat(3,1fr)] md:px-12 lg:px-16">
        <div className="flex max-w-xs flex-col gap-3">
          <span className="font-heading text-xl">{wordmark}</span>
          <p className="text-sm text-pretty text-white/60">{description}</p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} className="flex flex-col gap-3 text-sm">
            <span className="font-mono text-[11px] tracking-widest text-white/40 uppercase">
              {column.title}
            </span>
            {column.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="w-fit text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-6 py-6 text-xs text-white/40 md:px-12 lg:px-16">
        <span>{copyright}</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
        </div>
      </div>
      {/*
        The gradient shows only through the letters: the layer on top is black
        with white text and multiplies over the shader, so black hides it and
        white lets it through. This is why the footer background is black.
        Gray text lets it through dimmed, which is how intensity works.
      */}
      <div
        aria-hidden
        className="@container relative isolate overflow-hidden select-none"
      >
        <MeshGradient
          className="absolute inset-0 size-full"
          colors={colors}
          distortion={0.8}
          swirl={0.6}
          speed={speed}
        />
        <div
          className="relative bg-black text-center mix-blend-multiply"
          style={{
            color: `rgb(${255 * intensity} ${255 * intensity} ${255 * intensity})`,
          }}
        >
          <p className="pb-[0.2em] font-heading text-[30cqw] leading-none tracking-tighter whitespace-nowrap">
            {wordmark}
          </p>
        </div>
      </div>
    </footer>
  )
}

export { MeshGradientFooter, type FooterColumn }
