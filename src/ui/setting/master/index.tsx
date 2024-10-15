'use client'

import { Stack } from '@mantine/core'
import { IconApps } from '@tabler/icons-react'
import { useSearchParams } from 'next/navigation'
import MyTabs from '~/components/tabs'
import MyTitlePage from '~/components/title/MyTitlePage'
import { capitalizeFirstLetter } from '~/lib/string'
import CategoryTab from './category'

const tabLists = [
  {
    key: 'category',
    title: 'Category',
    icon: IconApps,
    children: <CategoryTab />,
  },
]

export default function SettingMaster() {
  const searchParams = useSearchParams()
  const tabs = searchParams.get('tabs') as string

  const baseUrl = '/setting/master'

  const defaultTabs = 'category'
  const subtitle = capitalizeFirstLetter(tabs || defaultTabs)

  return (
    <Stack gap="xl">
      <MyTitlePage title="Master" subtitle={subtitle} />

      <MyTabs baseURL={baseUrl} defaultValue={defaultTabs} data={tabLists} />
    </Stack>
  )
}
