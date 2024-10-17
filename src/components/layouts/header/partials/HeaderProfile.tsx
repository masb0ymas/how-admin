'use client'

import { Avatar, Divider, Group, Menu, rem, Text, UnstyledButton } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { IconLockOpen, IconLogout, IconUserCog } from '@tabler/icons-react'
import _ from 'lodash'
import Link from 'next/link'
import useProfile from '~/data/query/useProfile'
import { getInitialName } from '~/lib/string'

const menuItems = [
  {
    name: 'Profile',
    icon: IconUserCog,
    link: '/',
  },
  {
    name: 'Change Password',
    icon: IconLockOpen,
    link: '/',
  },
]

export default function HeaderProfile() {
  const { data } = useProfile()
  const fullname = _.get(data, 'fullname', '')
  const shortname = `${fullname.slice(0, 5)}...`

  const { width } = useViewportSize()

  return (
    <Menu
      withArrow
      shadow="md"
      position="bottom-end"
      radius="md"
      trigger="hover"
      openDelay={200}
      closeDelay={400}
    >
      <Menu.Target>
        <UnstyledButton>
          <Group>
            <Text component="span">
              Halo,{' '}
              <Text component="span" fw={600}>
                {width > 480 ? fullname : shortname}
              </Text>
            </Text>
            <Avatar color="teal">{getInitialName(fullname)}</Avatar>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {menuItems.map((item) => (
          <Menu.Item
            leftSection={<item.icon style={{ width: rem(14), height: rem(14) }} />}
            key={item.name}
            component={Link}
            href={item.link}
          >
            {item.name}
          </Menu.Item>
        ))}

        <Divider my={5} variant="dashed" />

        <Menu.Item
          color="red"
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
