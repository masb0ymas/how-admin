'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { RoleEntity } from '~/data/entity/role'
import { deleteRole, findRoles } from '../action'
import { columns } from './columns'

export default function RoleTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [roles, setRoles] = useState<RoleEntity[]>([])

  const getRoles = useCallback(async () => {
    const { data } = await findRoles()
    setRoles(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getRoles()
  }, [getRoles])

  const onDelete = useCallback(
    async (id: string) => {
      const { message, isError } = await deleteRole(id)

      if (isError) {
        toast.error(message)
      } else {
        toast.success(message)
      }

      getRoles()
    },
    [getRoles]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={roles}
      baseUrl="/account/role-permissions"
      onDelete={(id) => onDelete(id)}
    />
  )
}
