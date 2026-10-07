import Link from "next/link"
import { MeshGradient } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"
import { PAPER_SHADERS_URL } from "@/lib/site"
import { buttonVariants } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

function SiteHeader({
  sidebarTrigger = false,
}: {
  /** Full-width layout with a mobile sidebar toggle, for docs pages. */
  sidebarTrigger?: boolean
}) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div
        className={cn(
          "mx-auto flex h-14 items-center gap-6 px-4 sm:px-6",
          !sidebarTrigger && "max-w-7xl"
        )}
      >
        {sidebarTrigger && <SidebarTrigger className="-mr-4 -ml-2 md:hidden" />}
        <Link href="/" className="flex items-center gap-2.5">
          <MeshGradient
            aria-hidden
            className="size-5"
            colors={["#e0eaff", "#241d9a", "#f75092", "#9f50d3"]}
            distortion={0.8}
            swirl={0.4}
            speed={0.5}
          />
          <span className="font-heading text-base">shaderscn</span>
        </Link>
        <nav className="flex items-center gap-1 text-xs">
          <Link
            href="/"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Shaders
          </Link>
          <Link
            href="/docs"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Docs
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <a
            href={PAPER_SHADERS_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Paper Shaders
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
