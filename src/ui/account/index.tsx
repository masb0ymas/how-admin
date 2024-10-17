'use client'

import { Stack } from '@mantine/core'
import { IconGitMerge, IconUsers } from '@tabler/icons-react'
import { useSearchParams } from 'next/navigation'
import MyTabs from '~/components/tabs'
import MyTitlePage from '~/components/title/MyTitlePage'
import { capitalizeFirstLetter } from '~/lib/string'
import RoleTab from './role'
import UserTab from './user'

const tabLists = [
  {
    key: 'user',
    title: 'User',
    icon: IconUsers,
    children: <UserTab />,
  },
  {
    key: 'role',
    title: 'Role',
    icon: IconGitMerge,
    children: <RoleTab />,
  },
]

export default function Account() {
  const searchParams = useSearchParams()
  const tabs = searchParams.get('tabs') as string

  const baseUrl = '/account'

  const defaultTabs = 'user'
  const subtitle = capitalizeFirstLetter(tabs || defaultTabs)

  return (
    <Stack gap="xl">
      <MyTitlePage title="Account" subtitle={subtitle} />

      <MyTabs baseURL={baseUrl} defaultValue={defaultTabs} data={tabLists} />
    </Stack>
  )
}
