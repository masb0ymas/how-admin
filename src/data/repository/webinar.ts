import axios, { AxiosRequestConfig } from 'axios'
import { env } from '~/config/env'
import { WebinarEntity } from '../entity/webinar'

export default class WebinarRepository {
  /**
   *
   * @param formData
   * @param options
   * @returns
   */
  public static async create(formData: WebinarEntity, options?: AxiosRequestConfig) {
    const url = `${env.API_URL}/v1/webinar`
    const response = await axios.post(url, formData, options)
    return response.data
  }

  /**
   *
   * @param id
   * @param formData
   * @param options
   * @returns
   */
  public static async update(id: string, formData: WebinarEntity, options?: AxiosRequestConfig) {
    const url = `${env.API_URL}/v1/webinar/${id}`
    const response = await axios.put(url, formData, options)
    return response.data
  }

  /**
   *
   * @param id
   * @param options
   * @returns
   */
  public static async softDelete(id: string, options?: AxiosRequestConfig) {
    const url = `${env.API_URL}/v1/webinar/soft-delete/${id}`
    const response = await axios.delete(url, options)
    return response.data
  }

  /**
   *
   * @param id
   * @param options
   * @returns
   */
  public static async forceDelete(id: string, options?: AxiosRequestConfig) {
    const url = `${env.API_URL}/v1/webinar/force-delete/${id}`
    const response = await axios.delete(url, options)
    return response.data
  }
}
