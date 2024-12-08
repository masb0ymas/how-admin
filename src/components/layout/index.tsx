import { PropsWithChildren } from 'react'
import { Separator } from '../ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import AppBreadcrumb from './breadcrumb'
import { AppSidebar } from './sidebar'

type IProps = PropsWithChildren

export default function AppLayout({ children }: IProps) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <AppBreadcrumb />
          </div>
        </header>

        <main className="flex flex-col p-4 sm:p-6 lg:p-8 pt-0 lg:pt-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
