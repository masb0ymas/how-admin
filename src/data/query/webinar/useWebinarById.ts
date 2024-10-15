'use client'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios from 'axios'
import { env } from '~/config/env'
import { WebinarEntity } from '~/data/entity/webinar'

type UseResult = WebinarEntity
type TQueryFnData = UseResult
type TError = any

export default function useWebinarById(
  id: string,
  options?: UseQueryOptions<TQueryFnData, TError>
) {
  const query = useQuery<TQueryFnData, TError>({
    queryKey: ['webinar-by-id', id],
    queryFn: async () => {
      const url = `${env.API_URL}/v1/webinar/${id}`
      const result = await axios.get(url)
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
