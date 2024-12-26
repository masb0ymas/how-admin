'use server'

import axios, { AxiosInstance } from 'axios'
import { auth } from '../auth/handler'

function createAxios({ baseURL }: { baseURL: string }) {
  const instanceAxios = axios.create({ baseURL })

  instanceAxios.interceptors.request.use(async (config) => {
    const session = await auth()

    const currentConfig = { ...config }
    currentConfig.headers.Authorization = `Bearer ${session?.idToken}`

    return currentConfig
  })

  instanceAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error)
    }
  )

  return instanceAxios
}

export default async function createFetchApi(baseUrl: string) {
  let axiosInstance: AxiosInstance | null = null

  return {
    get default() {
      if (!axiosInstance) {
        axiosInstance = createAxios({ baseURL: baseUrl })
      }

      return axiosInstance
    },
  }
}
