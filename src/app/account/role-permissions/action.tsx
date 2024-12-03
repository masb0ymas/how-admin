'use server'

import axios from 'axios'
import _ from 'lodash'
import { env } from '~/config/env'

export async function getRoles() {
  let data = null
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
