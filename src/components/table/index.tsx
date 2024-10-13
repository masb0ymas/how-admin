'use client'

import { ActionIcon, Container, Group, rem, Tooltip } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { QueryObserverBaseResult } from '@tanstack/react-query'
import { DataTable, DataTableColumn } from 'mantine-datatable'
import Link from 'next/link'
import { useState } from 'react'

type IQuery = QueryObserverBaseResult & {
  data: any[]
  total: number
}

type IProps<T> = ReturnType<typeof DataTable<T>> & {
  query: IQuery
  columns: DataTableColumn<T>[]
  baseURL: string
}

export default function MyTable<T>(props: IProps<T>) {
  const { columns, baseURL, ...otherProps } = props
  const { data, isLoading, isFetching } = props.query

  const [selectedRecords, setSelectedRecords] = useState<T[]>([])

  const defaultColumns: DataTableColumn<T | any>[] = [
    ...columns,
    {
      accessor: 'actions',
      title: 'Actions',
      textAlign: 'center',
      width: '0%',
      render: ({ id }) => {
        return (
          <Group gap={4} justify="right" wrap="nowrap">
            <Tooltip transitionProps={{ transition: 'pop', duration: 300 }} label="Edit">
              <ActionIcon
                size="md"
                radius="md"
                variant="subtle"
                component={Link}
                href={`${baseURL}/${id}/edit`}
              >
                <IconEdit size={22} stroke={1.5} />
              </ActionIcon>
            </Tooltip>

            <Tooltip transitionProps={{ transition: 'pop', duration: 300 }} label="Edit">
              <ActionIcon
                size="md"
                radius="md"
                variant="subtle"
                color='red'
                component={Link}
                href={`${baseURL}/${id}/edit`}
              >
                <IconTrash size={22} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>
        )
      },
    },
  ]

  return (
    <Container size={rem(1070)} my={0}>
      <DataTable
        withTableBorder={false}
        borderRadius="md"
        withColumnBorders
        striped
        highlightOnHover
        records={data}
        fetching={isLoading || isFetching}
        pinLastColumn
        // @ts-expect-error
        columns={defaultColumns}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        {...otherProps}
      />
    </Container>
  )
}
