'use client'

import { Group, rem, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import classes from './partials/Header.module.css'
import HeaderProfile from './partials/HeaderProfile'

export default function Header() {
  return (
    <header className={classes.header}>
      <Group justify="space-between">
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
          placeholder="Search"
          radius="md"
        />

        <HeaderProfile />
      </Group>
    </header>
  )
}
