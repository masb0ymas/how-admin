'use client'

import { ActionIcon, Container, Group, rem, Text, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle, IconEdit, IconEye, IconTrash } from '@tabler/icons-react'
import { QueryObserverBaseResult, useMutation } from '@tanstack/react-query'
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
  showDetail?: (data: T) => void
  isEdited?: boolean
  isDeleted?: boolean
  mutationDelete?: ReturnType<typeof useMutation<any, any, any, any>>
}

export default function MyTable<T>(props: IProps<T>) {
  const {
    columns,
    baseURL,
    showDetail,
    isEdited = false,
    isDeleted = false,
    mutationDelete,
    ...otherProps
  } = props
  const { data, isLoading, isFetching } = props.query

  const [selectedRecords, setSelectedRecords] = useState<T[]>([])

  async function handleDelete(id: string) {
    try {
      await mutationDelete?.mutateAsync(id)
    } catch (error: any) {
      console.log(error)

      let title = 'Catch Error'
      let message = 'Something went wrong.'

      if (error.response?.data?.message) {
        title = error.response.data.error
        message = error.response.data.message
      }

      showNotification({
        title: title,
        message: message,
        color: 'red',
        icon: <IconAlertCircle size={18} stroke={1.5} />,
      })
    }
  }

  const openDeleteModal = (id: string) =>
    modals.openConfirmModal({
      title: 'Delete this record?',
      centered: true,
      radius: 'lg',
      children: (
        <Text size="sm">
          Are you sure you want to delete this record?
          <br />
          This action is destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Yes, delete it', cancel: "No don't delete it" },
      cancelProps: { radius: 'md' },
      confirmProps: { color: 'red', radius: 'md' },
      onCancel: () => modals.closeAll(),
      onConfirm: () => handleDelete(id),
    })

  const defaultColumns: DataTableColumn<T | any>[] = [
    ...columns,
    {
      accessor: 'actions',
      title: 'Actions',
      textAlign: 'center',
      width: '0%',
      render: (values) => {
        return (
          <Group gap={4} justify="center" wrap="nowrap">
            {showDetail?.call && (
              <Tooltip transitionProps={{ transition: 'pop', duration: 300 }} label="Detail">
                <ActionIcon
                  size="md"
                  radius="md"
                  color="teal"
                  variant="subtle"
                  onClick={() => showDetail(values)}
                >
                  <IconEye size={22} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            )}

            {isEdited && (
              <Tooltip transitionProps={{ transition: 'pop', duration: 300 }} label="Edit">
                <ActionIcon
                  size="md"
                  radius="md"
                  variant="subtle"
                  component={Link}
                  href={`${baseURL}/${values.id}`}
                >
                  <IconEdit size={22} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            )}

            {isDeleted && (
              <Tooltip transitionProps={{ transition: 'pop', duration: 300 }} label="Edit">
                <ActionIcon
                  size="md"
                  radius="md"
                  variant="subtle"
                  color="red"
                  onClick={() => openDeleteModal(values.id)}
                >
                  <IconTrash size={22} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            )}
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
        minHeight={200}
        columns={defaultColumns}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        {...otherProps}
      />
    </Container>
  )
}
