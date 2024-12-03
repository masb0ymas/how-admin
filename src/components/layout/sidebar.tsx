'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '../ui/sidebar'
import NavBrand from './nav-brand'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import { sidebarMenu } from './sidebar-menu'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = sidebarMenu

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavBrand />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
