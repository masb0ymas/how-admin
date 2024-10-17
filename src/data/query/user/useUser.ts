'use client'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import { env } from '~/config/env'
import { useStore } from '~/config/zustand'
import { UserEntity } from '~/data/entity/user'
import useUrlQuery, { UseUrlQueryOptions } from '~/lib/hooks/useUrlQuery'

interface UseResult {
  data: UserEntity[]
  total: number
}

type TQueryFnData = UseResult
type TError = any

export default function useUser(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>
) {
  const { auth } = useStore()
  const access_token = _.get(auth, 'access_token', '')

  const endpoint = `${env.API_URL}/v1/user?`
  const urlQuery = useUrlQuery(urlOptions)

  const query = useQuery<TQueryFnData, TError>({
    queryKey: urlQuery.transformKey(['user', endpoint, access_token]),
    queryFn: async () => {
      const axiosConfig: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${access_token}` },
      }

      const result = await axios.get(urlQuery.transformUrl(endpoint), axiosConfig)
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
