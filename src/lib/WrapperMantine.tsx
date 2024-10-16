'use client'

import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { PropsWithChildren } from 'react'
import RouterTransition from '~/components/router-transition'
import { env } from '~/config/env'
import { theme } from '~/styles/theme'

type IProps = PropsWithChildren

export default function WrapperMantine({ children }: IProps) {
  const colorSchemeManager = localStorageColorSchemeManager({
    key: `${env.APP_PREFIX}-color-scheme`,
  })

  return (
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
      <RouterTransition />
      <Notifications />

      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  )
}
