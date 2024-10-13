'use client'

import { Menu, rem, UnstyledButton, useMantineColorScheme } from '@mantine/core'
import { IconColorSwatch, IconDeviceDesktopCog, IconMoon, IconSun } from '@tabler/icons-react'
import classes from './Sidebar.module.css'

export default function SwitchTheme() {
  const { setColorScheme } = useMantineColorScheme()

  return (
    <Menu
      withArrow
      shadow="md"
      position="right"
      radius="md"
      trigger="hover"
      openDelay={200}
      closeDelay={400}
    >
      <Menu.Target>
        <UnstyledButton className={classes.link}>
          <IconColorSwatch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() => setColorScheme('auto')}
          leftSection={<IconDeviceDesktopCog style={{ width: rem(14), height: rem(14) }} />}
        >
          Auto
        </Menu.Item>

        <Menu.Item
          onClick={() => setColorScheme('light')}
          leftSection={<IconSun style={{ width: rem(14), height: rem(14) }} />}
        >
          Light
        </Menu.Item>

        <Menu.Item
          onClick={() => setColorScheme('dark')}
          leftSection={<IconMoon style={{ width: rem(14), height: rem(14) }} />}
        >
          Dark
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
