'use client'

import { Button, Group, TextInput } from '@mantine/core'
import { modals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconPlus, IconSearch } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import Link from 'next/link'
import { useState } from 'react'
import MyTable from '~/components/table'
import { useStore } from '~/config/zustand'
import { RoleEntity } from '~/data/entity/role'
import useRole from '~/data/query/role/useRole'
import RoleRepository from '~/data/repository/role'
import { columnRole } from './partials/columnDef'
import RoleDetail from './partials/Detail'

export default function RoleTab() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)

  const query = useRole({
    query: {
      defaultValue: {
        page,
        pageSize,
      },
    },
  })

  const baseUrl = '/account/role'

  const { auth } = useStore()
  const access_token = _.get(auth, 'access_token', '')

  const axiosConfig: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const softDeleteRole = useMutation({
    mutationFn: (id: string) => RoleRepository.softDelete(id, axiosConfig),
    onSuccess: (data) => {
      showNotification({
        title: 'Success',
        message: data.message,
        color: 'green',
        icon: <IconCheck size={18} stroke={1.5} />,
      })

      query.refetch()
    },
  })

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

      <MyTable<RoleEntity>
        baseURL={baseUrl}
        query={query}
        columns={columnRole}
        // @ts-expect-error
        page={page}
        onPageChange={setPage}
        recordsPerPage={pageSize}
        totalRecords={query.total}
        showDetail={(data) => {
          modals.open({
            title: "Detail Role",
            size: 'lg',
            radius: 'lg',
            children: <RoleDetail data={data} />,
          })
        }}
        isEdited
        isDeleted
        mutationDelete={softDeleteRole}
      />
    </>
  )
}
