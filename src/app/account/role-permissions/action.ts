'use server'

import _ from 'lodash'
import qs from 'qs'
import { z } from 'zod'
import { env } from '~/config/env'
import roleSchema from '~/data/schema/role'
import createFetchApi from '~/lib/action/fetcher'

type ReqFindRoles = {
  page: number
  pageSize: number
}

async function _axios() {
  const fetch = await createFetchApi(env.API_URL)
  return fetch.default
}

/**
 * Find Roles
 * @param data
 * @returns
 */
export async function findRoles({ page, pageSize }: ReqFindRoles) {
  const api = await _axios()

  let data = []
  let total = 0
  let message = null
  let isError = false

  const queryParams = qs.stringify({ page, pageSize }, { skipNulls: true })

  try {
    const res = await api.get(`/v1/role?${queryParams}`)
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
 * Find Role
 * @param id
 * @returns
 */
export async function findRoleById(id: string) {
  const api = await _axios()

  let data = null
  let message = null
  let isError = false

  try {
    const res = await api.get(`/v1/role/${id}`)
    data = res.data.data
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { data, message, isError }
}

/**
 * Create Role
 * @param data
 * @returns
 */
export async function createRole(data: z.infer<typeof roleSchema.create>) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.post('/v1/role', data)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}

/**
 * Update Role
 * @param id
 * @param data
 * @returns
 */
export async function updateRole(id: string, data: z.infer<typeof roleSchema.create>) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.put(`/v1/role/${id}`, data)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}

/**
 * Delete Role
 * @param id
 * @returns
 */
export async function deleteRole(id: string) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.delete(`/v1/role/soft-delete/${id}`)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}
