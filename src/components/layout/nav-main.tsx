'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from '~/components/ui/sidebar'
import { sidebarMenu } from './sidebar-menu'

export function NavMain() {
  const pathname = usePathname()

  return (
    <SidebarGroup className='space-y-4'>
      {sidebarMenu.map((menu) => (
        <nav key={menu.title}>
          <SidebarGroupLabel>{menu.title}</SidebarGroupLabel>
          {menu.items.map((item) => {
            const isActive = item.url === '/' ? pathname === '/' : pathname.startsWith(item.url)

            return (
              <SidebarMenu key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  key={item.title}
                  isActive={isActive}
                  asChild
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenu>
            )
          })}
        </nav>
      ))}
    </SidebarGroup>
  )
}
