import Link from "next/link"

import { getItemKind, getPreview, type RegistryItem } from "@/lib/registry"
import { Badge } from "@/components/ui/badge"
import { PreviewFrame } from "@/components/preview-frame"
import { ScaledPreview } from "@/components/scaled-preview"

// Virtual viewport each layout is rendered at before being scaled down.
const THUMBNAIL_SIZE = {
  section: { width: 1280, height: 800 },
  component: { width: 800, height: 500 },
  background: { width: 640, height: 400 },
}

function ShaderCard({ item }: { item: RegistryItem }) {
  const preview = getPreview(item.name)

  return (
    // Previews can contain their own links, so the card uses a stretched link
    // instead of wrapping everything in an <a>.
    <div className="group relative flex flex-col border bg-card transition-colors hover:border-foreground/30 has-focus-visible:ring-2 has-focus-visible:ring-ring">
      <div className="overflow-hidden border-b">
        <ScaledPreview
          {...THUMBNAIL_SIZE[preview.layout]}
          className="transition-transform duration-500 group-hover:scale-[1.02]"
        >
          <PreviewFrame layout={preview.layout}>{preview.element}</PreviewFrame>
        </ScaledPreview>
      </div>
      <div className="flex flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-heading text-sm">
            <Link
              href={`/shaders/${item.name}`}
              className="outline-none after:absolute after:inset-0"
            >
              {item.title}
            </Link>
          </h3>
          <Badge variant="outline">{getItemKind(item)}</Badge>
        </div>
        <p className="line-clamp-2 text-xs/relaxed text-muted-foreground">
          {item.description}
        </p>
      </div>
    </div>
  )
}

export { ShaderCard }
