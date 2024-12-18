'use client'

import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { CategoryEntity } from '~/data/entity/category'
import { deleteCategory, findCategories } from '../action'
import { columns } from './columns'

export default function CategoryTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)

  const [categories, setCategories] = useState<CategoryEntity[]>([])
  const [totalCategories, setTotalCategories] = useState(0)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getCategories = useCallback(async (page: number, pageSize: number) => {
    setIsFetching(true)

    const { data, total } = await findCategories({ page: page + 1, pageSize })
    setCategories(data)
    setTotalCategories(total)

    setIsLoading(false)
    setIsFetching(false)
  }, [])

  useEffect(() => {
    getCategories(pageIndex, pageSize)
  }, [getCategories, pageIndex, pageSize])

  const onPageChange = useCallback((page: number) => setPageIndex(page), [])
  const onPageSizeChange = useCallback((pageSize: number) => setPageSize(pageSize), [])

  const onDelete = useCallback(
    async (id: string) => {
      const { message, isError } = await deleteCategory(id)

      if (isError) {
        toast.error(message)
      } else {
        toast.success(message)
      }

      getCategories(pageIndex, pageSize)
    },
    [getCategories, pageIndex, pageSize]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={categories}
      total={totalCategories}
      baseUrl="/category"
      onDelete={(id) => onDelete(id)}
      pageSize={pageSize}
      pageIndex={pageIndex}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      isLoading={isFetching}
    />
  )
}
