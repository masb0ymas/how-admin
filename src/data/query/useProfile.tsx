'use client'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import { env } from '~/config/env'
import { useStore } from '~/config/zustand'
import { ProfileEntity } from '../entity/auth'

interface UseResult {
  data: ProfileEntity
  total: number
}

type TQueryFnData = UseResult
type TError = any

export default function useProfile(options?: UseQueryOptions<TQueryFnData, TError>) {
  const { auth } = useStore()
  const access_token = _.get(auth, 'access_token', '')
  const endpoint = `${env.API_URL}/v1/auth/verify-session`

  const query = useQuery<TQueryFnData, TError>({
    queryKey: ['auth-profile', access_token, endpoint],
    queryFn: async () => {
      const axiosConfig: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${access_token}` },
      }

      const result = await axios.get(endpoint, axiosConfig)
      return result.data
    },
    ...options,
  })

  return {
    ...query,
    data: query.data?.data,
  }
}
