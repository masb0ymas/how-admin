'use client'

import { Button, Group, TextInput } from '@mantine/core'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'
import MyTable from '~/components/table'
import { WebinarEntity } from '~/data/entity/webinar'
import useWebinar from '~/data/query/webinar/useWebinar'
import { columnWebinar } from '../partials/columnDef'

export default function UpcomingTab() {
  const query = useWebinar()

  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)

  const baseUrl = '/webinar'

  return (
    <>
      <Group justify="space-between" m={16}>
        <TextInput
          radius="md"
          name="search"
          placeholder="Search"
          leftSection={<IconSearch size={18} stroke={1.5} />}
        />

        <Button
          radius="md"
          size="compact-md"
          leftSection={<IconPlus size={18} stroke={2} />}
          component={Link}
          href={`${baseUrl}/add`}
        >
          Add
        </Button>
      </Group>

      <MyTable<WebinarEntity>
        query={query}
        columns={columnWebinar}
        // @ts-expect-error
        page={page}
        onPageChange={setPage}
        recordsPerPage={pageSize}
        totalRecords={query.total}
      />
    </>
  )
}
