import Link from "next/link"

import { getDocsGroups } from "@/lib/registry"
import { GITHUB_URL } from "@/lib/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { GitHubIcon } from "@/components/icons"
import { SiteLogo } from "@/components/site-logo"
import { SiteSearch } from "@/components/site-search"
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
        <SiteLogo />
        <nav className="flex items-center gap-1 text-xs">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden sm:inline-flex"
            )}
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
          <SiteSearch groups={getDocsGroups()} />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="shaderscn on GitHub"
            className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
          >
            <GitHubIcon />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
