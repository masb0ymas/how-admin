import axios, { AxiosRequestConfig } from 'axios'
import { env } from '~/config/env'
import { CategoryEntity } from '../entity/category'

export default class CategoryRepository {
  /**
   *
   * @param formData
   * @returns
   */
  public static async create(formData: CategoryEntity, options?: AxiosRequestConfig) {
    const url = `${env.API_URL}/v1/category`
    const response = await axios.post(url, formData, options)
    return response.data
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async update(id: string, formData: CategoryEntity, options?: AxiosRequestConfig) {
    const url = `${env.API_URL}/v1/category/${id}`
    const response = await axios.put(url, formData, options)
    return response.data
  }
}
