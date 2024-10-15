'use client'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios from 'axios'
import { env } from '~/config/env'
import { WebinarEntity } from '~/data/entity/webinar'

interface UseResult {
  data: WebinarEntity[]
  total: number
}

type TQueryFnData = UseResult
type TError = any

export default function useWebinar(options?: UseQueryOptions<TQueryFnData, TError>) {
  const query = useQuery<TQueryFnData, TError>({
    queryKey: ['webinar'],
    queryFn: async () => {
      const url = `${env.API_URL}/v1/webinar`
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
