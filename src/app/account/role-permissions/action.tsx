'use server'

import axios from 'axios'
import _ from 'lodash'
import { z } from 'zod'
import { env } from '~/config/env'
import roleSchema from '~/data/schema/role'

/**
 * Find Roles
 * @returns
 */
export async function findRoles() {
  let data = []
  let message = null
  let isError = false

  try {
    const res = await axios.get(`${env.API_URL}/v1/role`)
    data = res.data.data
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { data, message, isError }
}

/**
 * Find Role
 * @param id
 * @returns
 */
export async function findRole(id: string) {
  let data = null
  let message = null
  let isError = false

  try {
    const res = await axios.get(`${env.API_URL}/v1/role/${id}`)
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
  let message = null
  let isError = false

  try {
    const res = await axios.post(`${env.API_URL}/v1/role`, data)
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
  let message = null
  let isError = false

  try {
    const res = await axios.put(`${env.API_URL}/v1/role/${id}`, data)
    message = res.data.message
  } catch (err) {
    console.log(err)
    message = _.get(err, 'response.data.message', 'Something went wrong')
    isError = true
  }

  return { message, isError }
}
