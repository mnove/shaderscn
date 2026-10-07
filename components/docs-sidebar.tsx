"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ComponentIcon,
  LayersIcon,
  PanelsTopLeftIcon,
  TerminalIcon,
  type LucideIcon,
} from "lucide-react"

import type { DocsGroup, GroupId } from "@/lib/registry"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

// Plain icons rather than live shader thumbnails: browsers cap the number of
// WebGL contexts per page, and the sidebar lists every item.
const GROUP_ICONS: Record<GroupId, LucideIcon> = {
  sections: PanelsTopLeftIcon,
  backgrounds: LayersIcon,
  components: ComponentIcon,
}

function DocsSidebar({
  groups,
  ...props
}: { groups: DocsGroup[] } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  const link = (href: string) => (
    <Link href={href} onClick={() => setOpenMobile(false)} />
  )

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Getting started</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/docs"}
                  render={link("/docs")}
                >
                  <TerminalIcon />
                  <span>Installation</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {groups.map((group) => {
          const Icon = GROUP_ICONS[group.id]
          return (
            <SidebarGroup key={group.id}>
              <SidebarGroupLabel>
                <Icon />
                <span className="ml-2">{group.label}</span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const href = `/shaders/${item.name}`
                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          size="sm"
                          isActive={pathname === href}
                          render={link(href)}
                        >
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
    </Sidebar>
  )
}

export { DocsSidebar }
