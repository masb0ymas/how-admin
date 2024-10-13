import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/nprogress/styles.css'

import { ColorSchemeScript } from '@mantine/core'
import { PropsWithChildren } from 'react'
import WrapperMantine from '~/lib/WrapperMantine'
import WrapperReactQuery from '~/lib/WrapperReactQuery'

type IProps = PropsWithChildren

export const metadata = {
  title: 'House of Wizard',
  description: 'Learn Web3 Academy with House of Wizard',
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/static/logo-how.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <WrapperMantine>
          <WrapperReactQuery>{children}</WrapperReactQuery>
        </WrapperMantine>
      </body>
    </html>
  )
}
