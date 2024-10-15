import axios from 'axios'
import { env } from '~/config/env'
import { LoginEntity } from '../entity/auth'

export default class AuthRepository {
  /**
   *
   * @param formData
   * @returns
   */
  public static async signIn(formData: LoginEntity) {
    const url = `${env.API_URL}/v1/auth/sign-in`
    const response = await axios.post(url, formData)
    return response.data
  }
}
