'use client'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import { env } from '~/config/env'
import { useStore } from '~/config/zustand'
import { RoleEntity } from '~/data/entity/role'
import useUrlQuery, { UseUrlQueryOptions } from '~/lib/hooks/useUrlQuery'

interface UseResult {
  data: RoleEntity[]
  total: number
}

type TQueryFnData = UseResult
type TError = any

export default function useRole(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<TQueryFnData, TError>
) {
  const { auth } = useStore()
  const access_token = _.get(auth, 'access_token', '')

  const endpoint = `${env.API_URL}/v1/role?`
  const urlQuery = useUrlQuery(urlOptions)

  const query = useQuery<TQueryFnData, TError>({
    queryKey: urlQuery.transformKey(['role', endpoint, access_token]),
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
