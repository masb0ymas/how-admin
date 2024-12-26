'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { WebinarPrivateMemberEntity } from '~/data/entity/webinar-private-member'
import { deleteWebinarPrivateMember, findWebinarPrivateMembers } from '../action'
import { columns } from './columns'

export default function WebinarPrivateMemberTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)

  const [memberships, setMemberships] = useState<WebinarPrivateMemberEntity[]>([])
  const [totalMemberships, setTotalMemberships] = useState(0)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getMemberships = useCallback(async (page: number, pageSize: number) => {
    setIsFetching(true)

    const { data, total } = await findWebinarPrivateMembers({ page: page + 1, pageSize })
    setMemberships(data)
    setTotalMemberships(total)

    setIsLoading(false)
    setIsFetching(false)
  }, [])

  useEffect(() => {
    getMemberships(pageIndex, pageSize)
  }, [getMemberships, pageIndex, pageSize])

  const onPageChange = useCallback((page: number) => setPageIndex(page), [])
  const onPageSizeChange = useCallback((pageSize: number) => setPageSize(pageSize), [])

  const onDelete = useCallback(
    async (id: string) => {
      const { message, isError } = await deleteWebinarPrivateMember(id)

      if (isError) {
        toast.error(message)
      } else {
        toast.success(message)
      }

      getMemberships(pageIndex, pageSize)
    },
    [getMemberships, pageIndex, pageSize]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={memberships}
      total={totalMemberships}
      baseUrl="/private-membership"
      onDelete={(id) => onDelete(id)}
      pageSize={pageSize}
      pageIndex={pageIndex}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      isLoading={isFetching}
    />
  )
}
