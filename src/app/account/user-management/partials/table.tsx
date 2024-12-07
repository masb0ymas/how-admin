'use client'

import { useCallback, useEffect, useState } from 'react'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { UserEntity } from '~/data/entity/user'
import { findUsers } from '../action'
import { columns } from './columns'

export default function UsersTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<UserEntity[]>([])

  const getUsers = useCallback(async () => {
    const { data } = await findUsers()
    setUsers(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={users}
      baseUrl="/account/user-management"
      isEdit={false}
      isDelete={false}
    />
  )
}
