import axios, { AxiosRequestConfig } from 'axios'
import { env } from '~/config/env'
import { CategoryEntity } from '../entity/category'

export default class CategoryRepository {
  private static readonly baseURL = `${env.API_URL}/v1/category`

  /**
   *
   * @param formData
   * @param options
   * @returns
   */
  public static async create(formData: CategoryEntity, options?: AxiosRequestConfig) {
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
  public static async update(id: string, formData: CategoryEntity, options?: AxiosRequestConfig) {
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
