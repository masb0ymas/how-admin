'use server'

import _ from 'lodash'
import qs from 'qs'
import { env } from '~/config/env'
import createFetchApi from '~/lib/action/fetcher'

type ReqFindUsers = {
  page: number
  pageSize: number
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
export async function findUsers({ page, pageSize, filtered }: ReqFindUsers) {
  const api = await _axios()

  let data = []
  let total = 0
  let message = null
  let isError = false

  const queryParams = qs.stringify({ page, pageSize }, { skipNulls: true })

  let query = queryParams
  if (filtered) {
    query = `${queryParams}&filtered=${JSON.stringify(filtered)}`
  }

  try {
    const res = await api.get(`/v1/user?${query}`)
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
