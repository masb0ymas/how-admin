'use client'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios from 'axios'
import { env } from '~/config/env'
import { CategoryEntity } from '~/data/entity/category'

type UseResult = CategoryEntity
type TQueryFnData = UseResult
type TError = any

export default function useCategoryById(
  id: string,
  options?: UseQueryOptions<TQueryFnData, TError>
) {
  const endpoint = `${env.API_URL}/v1/category/${id}`

  const query = useQuery<TQueryFnData, TError>({
    queryKey: ['category-by-id', endpoint],
    queryFn: async () => {
      const result = await axios.get(endpoint)
      return result.data
    },
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
    select: (res: any) => res?.data,
    ...options,
  })

  return {
    ...query,
  }
}
