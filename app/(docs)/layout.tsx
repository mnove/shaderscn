import { getDocsGroups } from "@/lib/registry"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DocsSidebar } from "@/components/docs-sidebar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider
      className="flex-col [--header-height:calc(--spacing(14)+1px)]"
      style={{ "--sidebar-width": "15rem" } as React.CSSProperties}
    >
      <SiteHeader sidebarTrigger />
      <div className="flex flex-1">
        <DocsSidebar
          groups={getDocsGroups()}
          className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <SidebarInset className="min-w-0">{children}</SidebarInset>
          <SiteFooter fullWidth />
        </div>
      </div>
    </SidebarProvider>
  )
}
