'use server'

import _ from 'lodash'
import qs from 'qs'
import { env } from '~/config/env'
import createFetchApi from '~/lib/action/fetcher'

type ReqFindUsers = {
  page: number
  pageSize: number
  roleAs?: string
  filtered?: {
    [key: string]: any
  }[]
}

async function _axios() {
  const fetch = await createFetchApi(env.API_URL)
  return fetch.default
}

/**
 * Find Users
 * @returns
 */
export async function findUsers({ page, pageSize, roleAs, filtered }: ReqFindUsers) {
  const api = await _axios()

  let data = []
  let total = 0
  let message = null
  let isError = false

  let queryParams = qs.stringify({ page, pageSize }, { skipNulls: true })

  if (filtered) {
    queryParams = `${queryParams}&filtered=${JSON.stringify(filtered)}`
  }

  if (roleAs) {
    queryParams = `${queryParams}&roleAs=${roleAs}`
  }

  try {
    const res = await api.get(`/v1/user?${queryParams}`)
    data = res.data.data
    total = res.data.total
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { data, total, message, isError }
}

/**
 * Find User By Id
 * @param id
 * @returns
 */
export async function findUserById(id: string) {
  const api = await _axios()

  let data = null
  let message = null
  let isError = false

  try {
    const res = await api.get(`/v1/user/${id}`)
    data = res.data.data
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { data, message, isError }
}
