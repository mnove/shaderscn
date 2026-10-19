import { Link, useLocation } from "@tanstack/react-router"
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
  const pathname = useLocation({ select: (location) => location.pathname })
  const { setOpenMobile } = useSidebar()
  const close = () => setOpenMobile(false)

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
                  render={<Link to="/docs" onClick={close} />}
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
                    return (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          size="sm"
                          isActive={pathname === `/shaders/${item.name}`}
                          render={
                            <Link
                              to="/shaders/$name"
                              params={{ name: item.name }}
                              onClick={close}
                            />
                          }
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
