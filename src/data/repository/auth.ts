import axios from 'axios'
import { env } from '~/config/env'
import { LoginEntity } from '../entity/auth'

export default class AuthRepository {
  private static readonly baseURL = `${env.API_URL}/v1/auth`

  /**
   *
   * @param formData
   * @returns
   */
  public static async signIn(formData: LoginEntity) {
    const response = await axios.post(`${this.baseURL}/sign-in`, formData)
    return response.data
  }
}
