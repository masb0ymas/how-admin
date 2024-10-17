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
  const endpoint = `${env.API_URL}/v1/webinar/${id}`

  const query = useQuery<TQueryFnData, TError>({
    queryKey: ['webinar-by-id', endpoint],
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
