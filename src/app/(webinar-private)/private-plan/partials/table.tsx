'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { columns } from './columns'
import { deletePrivatePlan, findPrivatePlans } from '../action'
import { PrivatePlanEntity } from '~/data/entity/webinar-private-plan'

export default function PrivatePlanTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)

  const [privatePlans, setPrivatePlans] = useState<PrivatePlanEntity[]>([])
  const [totalPrivatePlans, setTotalPrivatePlans] = useState(0)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getPrivatePlans = useCallback(async (page: number, pageSize: number) => {
    setIsFetching(true)

    const { data, total } = await findPrivatePlans({ page: page + 1, pageSize })
    setPrivatePlans(data)
    setTotalPrivatePlans(total)

    setIsLoading(false)
    setIsFetching(false)
  }, [])

  useEffect(() => {
    getPrivatePlans(pageIndex, pageSize)
  }, [getPrivatePlans, pageIndex, pageSize])

  const onPageChange = useCallback((page: number) => setPageIndex(page), [])
  const onPageSizeChange = useCallback((pageSize: number) => setPageSize(pageSize), [])

  const onDelete = useCallback(
    async (id: string) => {
      const { message, isError } = await deletePrivatePlan(id)

      if (isError) {
        toast.error(message)
      } else {
        toast.success(message)
      }

      getPrivatePlans(pageIndex, pageSize)
    },
    [getPrivatePlans, pageIndex, pageSize]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={privatePlans}
      total={totalPrivatePlans}
      baseUrl="/private-plan"
      onDelete={(id) => onDelete(id)}
      pageSize={pageSize}
      pageIndex={pageIndex}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      isLoading={isFetching}
    />
  )
}
