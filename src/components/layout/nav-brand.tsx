'use client'

import Image from 'next/image'
import { SidebarMenu, SidebarMenuItem } from '~/components/ui/sidebar'

export default function NavBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Image
              src="/logo-how.png"
              alt="House of Wizard"
              className="h-10 w-10 object-contain"
              width={40}
              height={40}
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">House of Wizard</span>
            <span className="truncate text-xs">Learn Web3 Data Analyst</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
