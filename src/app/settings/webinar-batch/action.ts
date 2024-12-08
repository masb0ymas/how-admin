'use server'

import _ from 'lodash'
import qs from 'qs'
import { z } from 'zod'
import { env } from '~/config/env'
import webinarBatchSchema from '~/data/schema/webinar-batch'
import createFetchApi from '~/lib/action/fetcher'

type ReqFindWebinarBatches = {
  page: number
  pageSize: number
}

async function _axios() {
  const fetch = await createFetchApi(env.API_URL)
  return fetch.default
}

/**
 * Find Webinar Batches
 * @returns
 */
export async function findWebinarBatches({ page, pageSize }: ReqFindWebinarBatches) {
  const api = await _axios()

  let data = []
  let total = 0
  let message = null
  let isError = false

  const queryParams = qs.stringify({ page, pageSize }, { skipNulls: true })

  try {
    const res = await api.get(`/v1/webinar-batch?${queryParams}`)
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
 * Find Webinar Batch
 * @param id
 * @returns
 */
export async function findWebinarBatchById(id: string) {
  const api = await _axios()

  let data = null
  let message = null
  let isError = false

  try {
    const res = await api.get(`/v1/webinar-batch/${id}`)
    data = res.data.data
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { data, message, isError }
}

/**
 * Create Webinar Batch
 * @param data
 * @returns
 */
export async function createWebinarBatch(data: z.infer<typeof webinarBatchSchema.create>) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.post('/v1/webinar-batch', data)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}

/**
 * Update Webinar Batch
 * @param id
 * @param data
 * @returns
 */
export async function updateWebinarBatch(
  id: string,
  data: z.infer<typeof webinarBatchSchema.create>
) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.put(`/v1/webinar-batch/${id}`, data)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}

/**
 * Delete Webinar Batch
 * @param id
 * @returns
 */
export async function deleteWebinarBatch(id: string) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.delete(`/v1/webinar-batch/soft-delete/${id}`)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}
