import axios, { AxiosRequestConfig } from 'axios'
import { env } from '~/config/env'
import { CategoryEntity } from '../entity/category'

export default class CategoryRepository {
  /**
   *
   * @param formData
   * @param options
   * @returns
   */
  public static async create(formData: CategoryEntity, options?: AxiosRequestConfig) {
    const url = `${env.API_URL}/v1/category`
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
  public static async update(id: string, formData: CategoryEntity, options?: AxiosRequestConfig) {
    const url = `${env.API_URL}/v1/category/${id}`
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
    const url = `${env.API_URL}/v1/category/soft-delete/${id}`
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
    const url = `${env.API_URL}/v1/category/force-delete/${id}`
    const response = await axios.delete(url, options)
    return response.data
  }
}
