import { MeshGradientAnnouncementBar } from "@/registry/shaders/mesh-gradient-announcement-bar/mesh-gradient-announcement-bar"

/**
 * The bar is only a thin strip, so the preview puts it on top of a sketched
 * page to show where it lives.
 */
function AnnouncementBarDemo() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      <MeshGradientAnnouncementBar />
      <header className="flex items-center justify-between border-b px-8 py-4">
        <span className="font-heading text-sm font-semibold">Lumen</span>
        <nav className="flex gap-6 text-xs text-muted-foreground">
          <span>Product</span>
          <span>Pricing</span>
          <span>Customers</span>
          <span>Blog</span>
        </nav>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 py-24 text-center">
        <h1 className="max-w-2xl font-heading text-5xl leading-tight tracking-tight text-balance">
          Light, motion and color for the web
        </h1>
        <p className="max-w-md text-muted-foreground">
          Put news where everyone sees it first, without redesigning the page.
        </p>
      </div>
    </div>
  )
}

export { AnnouncementBarDemo }
