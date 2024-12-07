'use client'

import { IconChevronRight, IconHome2 } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import React from 'react'
import { capitalizeFirstLetter } from '~/lib/string'

export default function AppBreadcrumb() {
  const pathname = usePathname()

  const breadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => ({
      label: capitalizeFirstLetter(segment.replace(/-/g, ' ')),
      href: `/${array.slice(0, index + 1).join('/')}`,
    }))

  const newBreadcrumbs = [{ label: 'Home', href: '/' }, ...breadcrumbs]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {newBreadcrumbs.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {index === 0 ? (
                <BreadcrumbLink href={item.href} className="flex items-center">
                  <IconHome2 className="h-4 w-4 mr-2" />
                  <span className="sr-only">{item.label}</span>
                </BreadcrumbLink>
              ) : index === newBreadcrumbs.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href} className="flex items-center">
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {index < newBreadcrumbs.length - 1 && (
              <BreadcrumbSeparator>
                <IconChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
