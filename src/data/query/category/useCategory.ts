'use client'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios from 'axios'
import { env } from '~/config/env'
import { CategoryEntity } from '~/data/entity/category'

interface UseResult {
  data: CategoryEntity[]
  total: number
}

type TQueryFnData = UseResult
type TError = any

export default function useCategory(options?: UseQueryOptions<TQueryFnData, TError>) {
  const query = useQuery<TQueryFnData, TError>({
    queryKey: ['category'],
    queryFn: async () => {
      const url = `${env.API_URL}/v1/category`
      const result = await axios.get(url)
      return result.data
    },
    ...options,
  })

  return {
    ...query,
    data: query.data?.data || [],
    total: query.data?.total || 0,
  }
}
