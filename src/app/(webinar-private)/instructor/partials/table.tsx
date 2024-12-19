'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { InstructorEntity } from '~/data/entity/instructor'
import { deleteInstructor, findInstructors } from '../action'
import { columns } from './columns'

export default function InstructorTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)

  const [instructors, setInstructors] = useState<InstructorEntity[]>([])
  const [totalInstructors, setTotalInstructors] = useState(0)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getInstructors = useCallback(async (page: number, pageSize: number) => {
    setIsFetching(true)

    const { data, total } = await findInstructors({ page: page + 1, pageSize })
    setInstructors(data)
    setTotalInstructors(total)

    setIsLoading(false)
    setIsFetching(false)
  }, [])

  useEffect(() => {
    getInstructors(pageIndex, pageSize)
  }, [getInstructors, pageIndex, pageSize])

  const onPageChange = useCallback((page: number) => setPageIndex(page), [])
  const onPageSizeChange = useCallback((pageSize: number) => setPageSize(pageSize), [])

  const onDelete = useCallback(
    async (id: string) => {
      const { message, isError } = await deleteInstructor(id)

      if (isError) {
        toast.error(message)
      } else {
        toast.success(message)
      }

      getInstructors(pageIndex, pageSize)
    },
    [getInstructors, pageIndex, pageSize]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={instructors}
      total={totalInstructors}
      baseUrl="/instructor"
      onDelete={(id) => onDelete(id)}
      pageSize={pageSize}
      pageIndex={pageIndex}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      isLoading={isFetching}
    />
  )
}
