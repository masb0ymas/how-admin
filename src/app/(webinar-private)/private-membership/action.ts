'use server'

import _ from 'lodash'
import qs from 'qs'
import { z } from 'zod'
import { env } from '~/config/env'
import webinarPrivateMemberSchema from '~/data/schema/webinar-private-member'
import createFetchApi from '~/lib/action/fetcher'

type ReqFindWebinarPrivateMember = {
  page: number
  pageSize: number
}

async function _axios() {
  const fetch = await createFetchApi(env.API_URL)
  return fetch.default
}

/**
 * Find Webinar Private Member
 * @returns
 */
export async function findWebinarPrivateMembers({ page, pageSize }: ReqFindWebinarPrivateMember) {
  const api = await _axios()

  let data = []
  let total = 0
  let message = null
  let isError = false

  const queryParams = qs.stringify({ page, pageSize }, { skipNulls: true })

  try {
    const res = await api.get(`/v1/webinar-private-member?${queryParams}`)
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
 * Find Webinar Private Member
 * @param id
 * @returns
 */
export async function findWebinarPrivateMemberById(id: string) {
  const api = await _axios()

  let data = null
  let message = null
  let isError = false

  try {
    const res = await api.get(`/v1/webinar-private-member/${id}`)
    data = res.data.data
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { data, message, isError }
}

/**
 * Create Webinar Private Member
 * @param data
 * @returns
 */
export async function createWebinarPrivateMember(
  data: z.infer<typeof webinarPrivateMemberSchema.create>
) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.post('/v1/webinar-private-member', data)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}

/**
 * Update Webinar Private Member
 * @param id
 * @param data
 * @returns
 */
export async function updateWebinarPrivateMember(
  id: string,
  data: z.infer<typeof webinarPrivateMemberSchema.create>
) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.put(`/v1/webinar-private-member/${id}`, data)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}

/**
 * Delete Webinar Private Member
 * @param id
 * @returns
 */
export async function deleteWebinarPrivateMember(id: string) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.delete(`/v1/webinar-private-member/soft-delete/${id}`)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}
