'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { WebinarEntity } from '~/data/entity/webinar'
import { deleteWebinar, findWebinars } from '../action'
import { columns } from './columns'

export default function WebinarTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)

  const [webinars, setWebinars] = useState<WebinarEntity[]>([])
  const [totalWebinars, setTotalWebinars] = useState(0)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getWebinars = useCallback(async (page: number, pageSize: number) => {
    setIsFetching(true)

    const { data, total } = await findWebinars({ page: page + 1, pageSize })
    setWebinars(data)
    setTotalWebinars(total)

    setIsLoading(false)
    setIsFetching(false)
  }, [])

  useEffect(() => {
    getWebinars(pageIndex, pageSize)
  }, [getWebinars, pageIndex, pageSize])

  const onPageChange = useCallback((page: number) => setPageIndex(page), [])
  const onPageSizeChange = useCallback((pageSize: number) => setPageSize(pageSize), [])

  const onDelete = useCallback(
    async (id: string) => {
      const { message, isError } = await deleteWebinar(id)

      if (isError) {
        toast.error(message)
      } else {
        toast.success(message)
      }

      getWebinars(pageIndex, pageSize)
    },
    [getWebinars, pageIndex, pageSize]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={webinars}
      total={totalWebinars}
      baseUrl="/mini-courses"
      onDelete={(id) => onDelete(id)}
      pageSize={pageSize}
      pageIndex={pageIndex}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      isLoading={isFetching}
    />
  )
}
