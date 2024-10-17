'use client'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import { env } from '~/config/env'
import { useStore } from '~/config/zustand'
import { UserEntity } from '~/data/entity/user'

type UseResult = UserEntity
type TQueryFnData = UseResult
type TError = any

export default function useUserById(id: string, options?: UseQueryOptions<TQueryFnData, TError>) {
  const { auth } = useStore()
  const access_token = _.get(auth, 'access_token', '')

  const endpoint = `${env.API_URL}/v1/user/${id}`

  const query = useQuery<TQueryFnData, TError>({
    queryKey: ['user-by-id', endpoint, access_token],
    queryFn: async () => {
      const axiosConfig: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${access_token}` },
      }

      const result = await axios.get(endpoint, axiosConfig)
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
