'use client'

import { Stack, Text } from '@mantine/core'
import { IconCalendarTime, IconHistory } from '@tabler/icons-react'
import { useSearchParams } from 'next/navigation'
import MyTabs from '~/components/tabs'
import MyTitlePage from '~/components/title/MyTitlePage'
import { capitalizeFirstLetter } from '~/lib/string'

const tabLists = [
  {
    key: 'upcoming',
    title: 'Upcoming',
    icon: IconCalendarTime,
    children: <Text>Upcoming</Text>,
  },
  {
    key: 'archive',
    title: 'Archive',
    icon: IconHistory,
    children: <Text>Archive</Text>,
  },
]

export default function Webinar() {
  const searchParams = useSearchParams()
  const tabs = searchParams.get('tabs') as string

  const base_url = '/webinar'

  const defaultTabs = 'upcoming'
  const subtitle = capitalizeFirstLetter(tabs || defaultTabs)

  return (
    <Stack gap="xl">
      <MyTitlePage title="Webinar" subtitle={subtitle} />

      <MyTabs baseURL={base_url} defaultValue={defaultTabs} data={tabLists} />
    </Stack>
  )
}
