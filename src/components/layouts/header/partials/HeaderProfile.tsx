'use client'

import { Avatar, Divider, Group, Menu, rem, Text, UnstyledButton } from '@mantine/core'
import { IconLockOpen, IconLogout, IconUserCog } from '@tabler/icons-react'
import Link from 'next/link'
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
  const fullname = 'masb0ymas'

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
              Halo, <Text component="span" fw={600}>{fullname}</Text>
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
