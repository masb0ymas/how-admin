'use client'

import { Stack } from '@mantine/core'
import { IconCalendarTime, IconHistory } from '@tabler/icons-react'
import { useSearchParams } from 'next/navigation'
import MyTabs from '~/components/tabs'
import MyTitlePage from '~/components/title/MyTitlePage'
import { capitalizeFirstLetter } from '~/lib/string'
import ArchiveTab from './archive'
import UpcomingTab from './upcoming'

const tabLists = [
  {
    key: 'upcoming',
    title: 'Upcoming',
    icon: IconCalendarTime,
    children: <UpcomingTab />,
  },
  {
    key: 'archive',
    title: 'Archive',
    icon: IconHistory,
    children: <ArchiveTab />,
  },
]

export default function Webinar() {
  const searchParams = useSearchParams()
  const tabs = searchParams.get('tabs') as string

  const baseUrl = '/webinar'

  const defaultTabs = 'upcoming'
  const subtitle = capitalizeFirstLetter(tabs || defaultTabs)

  return (
    <Stack gap="xl">
      <MyTitlePage title="Webinar" subtitle={subtitle} />

      <MyTabs baseURL={baseUrl} defaultValue={defaultTabs} data={tabLists} />
    </Stack>
  )
}
