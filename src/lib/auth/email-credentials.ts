import _ from 'lodash'
import Credentials from 'next-auth/providers/credentials'
import AuthRepository from '~/data/repository/auth'

export const EmailCredentials = Credentials({
  id: 'credentials',
  name: 'credentials',
  credentials: {
    email: {
      label: 'Email',
      type: 'email',
      placeholder: 'Email',
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
    },
  },
  async authorize(credentials) {
    try {
      if (!credentials?.email || !credentials?.password) return null

      const response = await AuthRepository.signIn({
        ...credentials,
        latitude: '',
        longitude: '',
      })
      const result = response.data.data

      return {
        name: result.user.fullname,
        email: result.user.email,
        idToken: result.access_token,
        provider: 'credentials',
      }
    } catch (error: any) {
      const message = _.get(error, 'response.data.message', 'Invalid credentials')
      console.log({ message })
      return null
    }
  },
})
