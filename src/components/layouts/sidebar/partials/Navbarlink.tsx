'use client'

import { Menu, rem, Tooltip, UnstyledButton } from '@mantine/core'
import { IconHome2 } from '@tabler/icons-react'
import _ from 'lodash'
import { usePathname, useRouter } from 'next/navigation'
import classes from './Sidebar.module.css'

interface BaseNavbarLinkProps {
  icon: typeof IconHome2
  label: string
  link?: string
  active?: boolean
}

interface NavbarLinkProps extends BaseNavbarLinkProps {
  links?: BaseNavbarLinkProps[]
}

export default function Navbarlink(props: NavbarLinkProps) {
  const { icon: Icon, label, link, active, links } = props

  const router = useRouter()
  const pathname = usePathname()

  return (
    <>
      {!_.isEmpty(links) ? (
        <Menu
          withArrow
          shadow="md"
          position="right-start"
          radius="md"
          trigger="hover"
          openDelay={200}
          closeDelay={400}
        >
          <Menu.Target>
            <UnstyledButton className={classes.link} data-active={active || undefined}>
              <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} color={'#705C53'} />
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            {links?.map((item) => {
              const matchPath = pathname.match(String(item.link))
              const is_active = !_.isEmpty(matchPath)

              return (
                <Menu.Item
                  leftSection={<item.icon style={{ width: rem(16), height: rem(16) }} />}
                  onClick={() => router.push(String(item.link))}
                  data-active={is_active}
                  color={is_active ? 'blue' : undefined}
                  key={item.label}
                >
                  {item.label}
                </Menu.Item>
              )
            })}
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
          <UnstyledButton
            onClick={() => router.push(String(link))}
            className={classes.link}
            data-active={active || undefined}
          >
            <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          </UnstyledButton>
        </Tooltip>
      )}
    </>
  )
}
