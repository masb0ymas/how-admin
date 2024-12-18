'use client'

import Link from 'next/link'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from '~/components/ui/sidebar'
import { sidebarMenu } from './sidebar-menu'

export function NavMain() {
  return (
    <SidebarGroup>
      {sidebarMenu.map((menu) => (
        <div className="mb-2" key={menu.title}>
          <SidebarGroupLabel>{menu.title}</SidebarGroupLabel>
          {menu.items.map((item) => (
            <SidebarMenu key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                key={item.title}
                // isActive={item.isActive}
                asChild
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenu>
          ))}
        </div>
      ))}
    </SidebarGroup>
  )
}
