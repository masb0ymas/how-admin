'use client'

import { Center, rem, Stack, Tooltip, UnstyledButton } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import _ from 'lodash'
import { usePathname } from 'next/navigation'
import MyImage from '~/components/image'
import useMenuSidebar from '~/data/query/useMenuSidebar'
import Navbarlink from './partials/Navbarlink'
import classes from './partials/Sidebar.module.css'
import SwitchTheme from './partials/SwitchTheme'

export default function Sidebar() {
  const pathname = usePathname()

  const queryMenu = useMenuSidebar()
  const { data } = queryMenu

  const links = data.map((item) => {
    const links_active = item.links?.find((x) => x.link === pathname)
    const matchPath = pathname.match(String(item.link))
    const is_active = !_.isEmpty(matchPath) || !_.isEmpty(links_active)

    return <Navbarlink {...item} key={item.label} active={is_active} link={item.link} />
  })

  function handleLogout() {
    console.log('logout')
  }

  return (
    <nav className={classes.navbar}>
      <Center>
        <MyImage src="/static/logo-how.png" alt="logo house of wizard" width="45px" height="45px" />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={10}>
        <SwitchTheme />

        <Tooltip label="Logout" position="right" transitionProps={{ duration: 0 }}>
          <UnstyledButton className={classes.link} color="red" onClick={() => handleLogout()}>
            <IconLogout color="red" style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </UnstyledButton>
        </Tooltip>
      </Stack>
    </nav>
  )
}
