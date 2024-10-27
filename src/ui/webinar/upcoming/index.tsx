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
import { WebinarEntity } from '~/data/entity/webinar'
import useWebinar from '~/data/query/webinar/useWebinar'
import WebinarRepository from '~/data/repository/webinar'
import { columnWebinar } from '../partials/columnDef'
import WebinarDetail from '../partials/Detail'

export default function UpcomingTab() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)

  const query = useWebinar({
    query: {
      defaultValue: {
        page,
        pageSize,
        status: 'upcoming',
      },
    },
  })

  const baseUrl = '/webinar/upcoming'

  const { auth } = useStore()
  const access_token = _.get(auth, 'access_token', '')

  const axiosConfig: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${access_token}` },
  }

  const softDeleteWebinar = useMutation({
    mutationFn: (id: string) => WebinarRepository.softDelete(id, axiosConfig),
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
        isDeleted
        mutationDelete={softDeleteWebinar}
      />
    </>
  )
}
