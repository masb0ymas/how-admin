'use client'

import { Button, Group, TextInput } from '@mantine/core'
import { IconExternalLink, IconPlus, IconSearch } from '@tabler/icons-react'
import { format } from 'date-fns'
import { DataTableColumn } from 'mantine-datatable'
import Link from 'next/link'
import { useState } from 'react'
import MyTable from '~/components/table'
import { WebinarEntity } from '~/data/entity/webinar'
import useWebinar from '~/data/query/webinar/useWebinar'

export default function UpcomingTab() {
  const query = useWebinar()

  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)

  const columns: DataTableColumn<WebinarEntity>[] = [
    {
      accessor: 'title',
      title: 'Title',
      width: 300,
    },
    {
      accessor: 'speakers',
      title: 'Speakers',
    },
    {
      accessor: 'category.name',
      title: 'Category',
    },
    {
      accessor: 'start_date',
      title: 'Start Date',
      width: 150,
      render: ({ start_date }) => {
        if (start_date) {
          return format(new Date(start_date), 'dd MMM yyyy HH:mm')
        }
        return '-'
      },
    },
    {
      accessor: 'end_date',
      title: 'End Date',
      width: 150,
      render: ({ end_date }) => {
        if (end_date) {
          return format(new Date(end_date), 'dd MMM yyyy HH:mm')
        }
        return '-'
      },
    },
    {
      accessor: 'link',
      title: 'Link',
      render: ({ link }) => {
        if (link) {
          return (
            <Button
              variant="subtle"
              component={Link}
              href={link}
              target="_blank"
              rel="noreferrer"
              leftSection={<IconExternalLink size={18} stroke={1.5} />}
              size="compact-md"
              radius="md"
            >
              Link
            </Button>
          )
        }
        return '-'
      },
    },
    {
      accessor: 'ipfs_cid',
      title: 'IPFS CID',
    },
  ]

  return (
    <>
      <Group justify="space-between" m={16}>
        <TextInput
          radius="md"
          name="search"
          placeholder="Search"
          leftSection={<IconSearch size={18} stroke={1.5} />}
        />

        <Button radius="md" size="compact-md" leftSection={<IconPlus size={18} stroke={2} />}>
          Add
        </Button>
      </Group>

      <MyTable<WebinarEntity>
        query={query}
        columns={columns}
        // @ts-expect-error
        page={page}
        onPageChange={setPage}
        recordsPerPage={pageSize}
        totalRecords={query.total}
      />
    </>
  )
}
