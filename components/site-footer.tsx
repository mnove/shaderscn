import Link from "next/link"

import { GITHUB_URL, PAPER_SHADERS_URL } from "@/lib/site"
import { cn } from "@/lib/utils"
import { SiteLogo } from "@/components/site-logo"

const LINKS = [
  { label: "Shaders", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "Paper Shaders", href: PAPER_SHADERS_URL, external: true },
]

function SiteFooter({
  fullWidth = false,
}: {
  /** Span the container instead of the centered max width, for docs pages. */
  fullWidth?: boolean
}) {
  return (
    <footer className="border-t">
      <div
        className={cn(
          "mx-auto flex flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6",
          !fullWidth && "max-w-7xl"
        )}
      >
        <div className="flex flex-col gap-2">
          <SiteLogo />
          <p className="text-xs text-muted-foreground">
            Built by Marcello Novelli. Released under the{" "}
            <a
              href={`${GITHUB_URL}/blob/main/LICENSE`}
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              MIT License
            </a>
            .
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground"
        >
          {LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-foreground"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </footer>
  )
}

export { SiteFooter }
