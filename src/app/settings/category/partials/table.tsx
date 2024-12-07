'use client'

import { useCallback, useEffect, useState } from 'react'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { CategoryEntity } from '~/data/entity/category'
import { deleteCategory, findCategories } from '../action'
import { columns } from './columns'
import toast from 'react-hot-toast'

export default function CategoryTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<CategoryEntity[]>([])

  const getCategories = useCallback(async () => {
    const { data } = await findCategories()
    setCategories(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getCategories()
  }, [getCategories])

  const onDelete = useCallback(
    async (id: string) => {
      const { message, isError } = await deleteCategory(id)

      if (isError) {
        toast.error(message)
      } else {
        toast.success(message)
      }

      getCategories()
    },
    [getCategories]
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={categories}
      baseUrl="/settings/category"
      onDelete={(id) => onDelete(id)}
    />
  )
}
