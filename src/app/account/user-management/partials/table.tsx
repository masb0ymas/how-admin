'use client'

import { useCallback, useEffect, useState } from 'react'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { UserEntity } from '~/data/entity/user'
import { findUsers } from '../action'
import { columns } from './columns'

export default function UsersTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)

  const [users, setUsers] = useState<UserEntity[]>([])
  const [totalUsers, setTotalUsers] = useState(0)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getUsers = useCallback(async (page: number, pageSize: number) => {
    setIsFetching(true)

    const { data, total } = await findUsers({ page: page + 1, pageSize })
    setUsers(data)
    setTotalUsers(total)

    setIsLoading(false)
    setIsFetching(false)
  }, [])

  useEffect(() => {
    getUsers(pageIndex, pageSize)
  }, [getUsers, pageIndex, pageSize])

  const onPageChange = useCallback((page: number) => setPageIndex(page), [])
  const onPageSizeChange = useCallback((pageSize: number) => setPageSize(pageSize), [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={users}
      total={totalUsers}
      baseUrl="/account/user-management"
      isEdit={false}
      isDelete={false}
      pageSize={pageSize}
      pageIndex={pageIndex}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      isLoading={isFetching}
    />
  )
}
