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
  const [totalRoles, setTotalRoles] = useState(0)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getRoles = useCallback(async (page: number, pageSize: number) => {
    const { data, total } = await findRoles({ page: page + 1, pageSize })
    setRoles(data)
    setTotalRoles(total)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getRoles(pageIndex, pageSize)
  }, [getRoles, pageIndex, pageSize])

  const onPageChange = useCallback((page: number) => setPageIndex(page), [])
  const onPageSizeChange = useCallback((pageSize: number) => setPageSize(pageSize), [])

  const onDelete = useCallback(
    async (id: string) => {
      const { message, isError } = await deleteRole(id)

      if (isError) {
        toast.error(message)
      } else {
        toast.success(message)
      }

      getRoles(pageIndex, pageSize)
    },
    [getRoles, pageIndex, pageSize]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={roles}
      total={totalRoles}
      baseUrl="/account/role-permissions"
      onDelete={(id) => onDelete(id)}
      pageSize={pageSize}
      pageIndex={pageIndex}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      isLoading={isLoading}
    />
  )
}
