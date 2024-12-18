'use client'

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '../ui/sidebar'
import NavBrand from './nav-brand'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavBrand />
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
