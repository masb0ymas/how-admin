'use client'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios from 'axios'
import { env } from '~/config/env'
import { WebinarEntity } from '~/data/entity/webinar'
import useUrlQuery, { UseUrlQueryOptions } from '~/lib/hooks/useUrlQuery'

interface UseResult {
  data: WebinarEntity[]
  total: number
}

type TQueryFnData = UseResult
type TError = any

export default function useWebinar(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>
) {
  const endpoint = `${env.API_URL}/v1/webinar?`
  const urlQuery = useUrlQuery(urlOptions)

  const query = useQuery<TQueryFnData, TError>({
    queryKey: urlQuery.transformKey(['webinar', endpoint]),
    queryFn: async () => {
      const result = await axios.get(urlQuery.transformUrl(endpoint))
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
