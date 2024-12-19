'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { WebinarPrivateEntity } from '~/data/entity/webinar-private'
import { deletePrivateCourse, findPrivateCourses } from '../action'
import { columns } from './columns'

export default function PrivateCoursesTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)

  const [privateCourses, setPrivateCourses] = useState<WebinarPrivateEntity[]>([])
  const [totalPrivateCourses, setTotalPrivateCourses] = useState(0)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getPrivateCourses = useCallback(async (page: number, pageSize: number) => {
    setIsFetching(true)

    const { data, total } = await findPrivateCourses({ page: page + 1, pageSize })
    setPrivateCourses(data)
    setTotalPrivateCourses(total)

    setIsLoading(false)
    setIsFetching(false)
  }, [])

  useEffect(() => {
    getPrivateCourses(pageIndex, pageSize)
  }, [getPrivateCourses, pageIndex, pageSize])

  const onPageChange = useCallback((page: number) => setPageIndex(page), [])
  const onPageSizeChange = useCallback((pageSize: number) => setPageSize(pageSize), [])

  const onDelete = useCallback(
    async (id: string) => {
      const { message, isError } = await deletePrivateCourse(id)

      if (isError) {
        toast.error(message)
      } else {
        toast.success(message)
      }

      getPrivateCourses(pageIndex, pageSize)
    },
    [getPrivateCourses, pageIndex, pageSize]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={privateCourses}
      total={totalPrivateCourses}
      baseUrl="/private-courses"
      onDelete={(id) => onDelete(id)}
      pageSize={pageSize}
      pageIndex={pageIndex}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      isLoading={isFetching}
    />
  )
}
