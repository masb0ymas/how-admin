'use client'

import { Group, TextInput } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import MyTable from '~/components/table'
import { WebinarEntity } from '~/data/entity/webinar'
import useWebinar from '~/data/query/webinar/useWebinar'
import WebinarDetail from '../partials/Detail'
import { columnWebinar } from '../partials/columnDef'

export default function ArchiveTab() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)

  const query = useWebinar({
    query: {
      defaultValue: {
        page,
        pageSize,
        status: 'archive',
      },
    },
  })

  const baseUrl = '/webinar/archive'

  return (
    <>
      <Group justify="space-between" m={16}>
        <TextInput
          radius="md"
          name="search"
          placeholder="Search"
          leftSection={<IconSearch size={18} stroke={1.5} />}
        />
      </Group>

      <MyTable<WebinarEntity>
        baseURL={baseUrl}
        query={query}
        columns={columnWebinar}
        // @ts-expect-error
        page={page}
        onPageChange={setPage}
        recordsPerPage={pageSize}
        totalRecords={query.total}
        showDetail={(data) => {
          modals.open({
            title: data.title,
            size: 'lg',
            radius: 'lg',
            children: <WebinarDetail data={data} />,
          })
        }}
        isEdited
      />
    </>
  )
}
