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
  const [webinarBatches, setWebinarBatches] = useState<WebinarBatchEntity[]>([])

  const getWebinarBatches = useCallback(async () => {
    const { data } = await findWebinarBatches()
    setWebinarBatches(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getWebinarBatches()
  }, [getWebinarBatches])

  const onDelete = useCallback(
    async (id: string) => {
      const { message, isError } = await deleteWebinarBatch(id)

      if (isError) {
        toast.error(message)
      } else {
        toast.success(message)
      }

      getWebinarBatches()
    },
    [getWebinarBatches]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={webinarBatches}
      baseUrl="/settings/webinar-batch"
      onDelete={(id) => onDelete(id)}
    />
  )
}
