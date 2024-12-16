'use server'

import _ from 'lodash'
import qs from 'qs'
import { z } from 'zod'
import { env } from '~/config/env'
import webinarSchema from '~/data/schema/webinar'
import createFetchApi from '~/lib/action/fetcher'

type ReqFindWebinars = {
  page: number
  pageSize: number
}

async function _axios() {
  const fetch = await createFetchApi(env.API_URL)
  return fetch.default
}

/**
 * Find Webinars
 * @returns
 */
export async function findWebinars({ page, pageSize }: ReqFindWebinars) {
  const api = await _axios()

  let data = []
  let total = 0
  let message = null
  let isError = false

  const queryParams = qs.stringify({ page, pageSize }, { skipNulls: true })

  try {
    const res = await api.get(`/v1/webinar?${queryParams}`)
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
 * Find Webinar
 * @param id
 * @returns
 */
export async function findWebinarById(id: string) {
  const api = await _axios()

  let data = null
  let message = null
  let isError = false

  try {
    const res = await api.get(`/v1/webinar/${id}`)
    data = res.data.data
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { data, message, isError }
}

/**
 * Create Webinar
 * @param data
 * @returns
 */
export async function createWebinar(data: z.infer<typeof webinarSchema.create>) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.post('/v1/webinar', data)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}

/**
 * Update Webinar
 * @param id
 * @param data
 * @returns
 */
export async function updateWebinar(id: string, data: z.infer<typeof webinarSchema.create>) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.put(`/v1/webinar/${id}`, data)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}

/**
 * Delete Webinar
 * @param id
 * @returns
 */
export async function deleteWebinar(id: string) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.delete(`/v1/webinar/soft-delete/${id}`)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}
