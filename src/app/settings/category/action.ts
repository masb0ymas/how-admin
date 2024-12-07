'use server'

import _ from 'lodash'
import { z } from 'zod'
import { env } from '~/config/env'
import categorySchema from '~/data/schema/category'
import createFetchApi from '~/lib/action/fetcher'

async function _axios() {
  const fetch = await createFetchApi(env.API_URL)
  return fetch.default
}

/**
 * Find Categories
 * @returns
 */
export async function findCategories() {
  const api = await _axios()

  let data = []
  let message = null
  let isError = false

  try {
    const res = await api.get('/v1/category')
    data = res.data.data
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { data, message, isError }
}

/**
 * Find Category
 * @param id
 * @returns
 */
export async function findCategoryById(id: string) {
  const api = await _axios()

  let data = null
  let message = null
  let isError = false

  try {
    const res = await api.get(`/v1/category/${id}`)
    data = res.data.data
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { data, message, isError }
}

/**
 * Create Category
 * @param data
 * @returns
 */
export async function createCategory(data: z.infer<typeof categorySchema.create>) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.post('/v1/category', data)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}

/**
 * Update Category
 * @param id
 * @param data
 * @returns
 */
export async function updateCategory(id: string, data: z.infer<typeof categorySchema.create>) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.put(`/v1/category/${id}`, data)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}

/**
 * Delete Category
 * @param id
 * @returns
 */
export async function deleteCategory(id: string) {
  const api = await _axios()

  let message = null
  let isError = false

  try {
    const res = await api.delete(`/v1/category/soft-delete/${id}`)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}
