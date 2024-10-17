'use client'

import {
  completeNavigationProgress,
  NavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function RouterTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const _push = router.push.bind(router)

    router.push = (href, options) => {
      startNavigationProgress()
      _push(href, options)
    }
  }, [router])

  useEffect(() => {
    completeNavigationProgress()
  }, [pathname, searchParams])

  return <NavigationProgress />
}
