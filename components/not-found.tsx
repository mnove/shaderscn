import { Link } from "@tanstack/react-router"

import { buttonVariants } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

/** The root route's not-found page, also prerendered as 404.html. */
function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60svh] max-w-7xl flex-col items-start justify-center gap-4 px-4 py-16 sm:px-6">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          404
        </p>
        <h1 className="font-heading text-3xl tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="text-sm/relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link to="/" className={buttonVariants()}>
          Browse shaders
        </Link>
      </main>
      <SiteFooter />
    </>
  )
}

export { NotFound }
