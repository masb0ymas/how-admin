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
import { CategoryEntity } from '~/data/entity/category'
import useCategory from '~/data/query/category/useCategory'
import CategoryRepository from '~/data/repository/category'
import { columnCategory } from './partials/columnDef'
import CategoryDetail from './partials/Detail'

export default function CategoryTab() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)

  const query = useCategory({
    query: {
      defaultValue: {
        page,
        pageSize,
      },
    },
  })

  const baseUrl = `/setting/master/category`

  const { auth } = useStore()
  const access_token = _.get(auth, 'access_token', '')

  const axiosConfig: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const softDeleteCategory = useMutation({
    mutationFn: (id: string) => CategoryRepository.softDelete(id, axiosConfig),
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

      <MyTable<CategoryEntity>
        baseURL={baseUrl}
        query={query}
        columns={columnCategory}
        // @ts-expect-error
        page={page}
        onPageChange={setPage}
        recordsPerPage={pageSize}
        totalRecords={query.total}
        showDetail={(data) => {
          modals.open({
            title: 'Detail Category',
            size: 'lg',
            radius: 'lg',
            children: <CategoryDetail data={data} />,
          })
        }}
        isEdited
        isDeleted
        mutationDelete={softDeleteCategory}
      />
    </>
  )
}
