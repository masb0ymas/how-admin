'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { WebinarBatchEntity } from '~/data/entity/webinar-batch'
import { deleteWebinarBatch, findWebinarBatches } from '../action'
import { columns } from './columns'

export default function WebinarBatchTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)

  const [webinarBatches, setWebinarBatches] = useState<WebinarBatchEntity[]>([])
  const [totalWebinarBatches, setTotalWebinarBatches] = useState(0)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getWebinarBatches = useCallback(async (page: number, pageSize: number) => {
    setIsFetching(true)

    const { data, total } = await findWebinarBatches({ page: page + 1, pageSize })
    setWebinarBatches(data)
    setTotalWebinarBatches(total)

    setIsLoading(false)
    setIsFetching(false)
  }, [])

  useEffect(() => {
    getWebinarBatches(pageIndex, pageSize)
  }, [getWebinarBatches, pageIndex, pageSize])

  const onPageChange = useCallback((page: number) => setPageIndex(page), [])
  const onPageSizeChange = useCallback((pageSize: number) => setPageSize(pageSize), [])

  const onDelete = useCallback(
    async (id: string) => {
      const { message, isError } = await deleteWebinarBatch(id)

      if (isError) {
        toast.error(message)
      } else {
        toast.success(message)
      }

      getWebinarBatches(pageIndex, pageSize)
    },
    [getWebinarBatches, pageIndex, pageSize]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={webinarBatches}
      total={totalWebinarBatches}
      baseUrl="/settings/webinar-batch"
      onDelete={(id) => onDelete(id)}
      pageSize={pageSize}
      pageIndex={pageIndex}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      isLoading={isFetching}
    />
  )
}
