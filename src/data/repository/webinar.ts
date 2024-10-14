import axios, { AxiosRequestConfig } from 'axios'
import { env } from '~/config/env'
import { WebinarEntity } from '../entity/webinar'

export default class WebinarRepository {
  /**
   *
   * @param formData
   * @returns
   */
  public static async create(formData: WebinarEntity, options?: AxiosRequestConfig) {
    const url = `${env.API_URL}/v1/webinar`
    const response = await axios.post(url, formData, options)
    return response.data
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async update(id: string, formData: WebinarEntity, options?: AxiosRequestConfig) {
    const url = `${env.API_URL}/v1/webinar/${id}`
    const response = await axios.put(url, formData, options)
    return response.data
  }
}
