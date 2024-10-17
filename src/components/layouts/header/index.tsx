'use client'

import { Group, rem, TextInput, ThemeIcon } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import classes from './partials/Header.module.css'
import HeaderProfile from './partials/HeaderProfile'
import { useViewportSize } from '@mantine/hooks'

export default function Header() {
  const { width } = useViewportSize()

  return (
    <header className={classes.header}>
      <Group justify="space-between">
        {width > 480 ? (
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
            placeholder="Search"
            radius="md"
          />
        ) : (
          <ThemeIcon size="lg" radius="lg" variant="light">
            <IconSearch size={22} />
          </ThemeIcon>
        )}

        <HeaderProfile />
      </Group>
    </header>
  )
}
