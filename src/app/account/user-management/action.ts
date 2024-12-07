'use server'

import _ from 'lodash'
import { env } from '~/config/env'
import createFetchApi from '~/lib/action/fetcher'

async function _axios() {
  const fetch = await createFetchApi(env.API_URL)
  return fetch.default
}

/**
 * Find Users
 * @returns
 */
export async function findUsers() {
  const api = await _axios()

  let data = []
  let message = null
  let isError = false

  try {
    const res = await api.get('/v1/user')
    data = res.data.data
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { data, message, isError }
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
