import axios, { AxiosRequestConfig } from 'axios'
import { env } from '~/config/env'
import { WebinarEntity } from '../entity/webinar'

export default class WebinarRepository {
  private static readonly baseURL = `${env.API_URL}/v1/webinar`

  /**
   *
   * @param formData
   * @param options
   * @returns
   */
  public static async create(formData: WebinarEntity, options?: AxiosRequestConfig) {
    const response = await axios.post(this.baseURL, formData, options)
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
    const response = await axios.put(`${this.baseURL}/${id}`, formData, options)
    return response.data
  }

  /**
   *
   * @param id
   * @param options
   * @returns
   */
  public static async softDelete(id: string, options?: AxiosRequestConfig) {
    const response = await axios.delete(`${this.baseURL}/soft-delete/${id}`, options)
    return response.data
  }

  /**
   *
   * @param id
   * @param options
   * @returns
   */
  public static async forceDelete(id: string, options?: AxiosRequestConfig) {
    const response = await axios.delete(`${this.baseURL}/force-delete/${id}`, options)
    return response.data
  }
}
