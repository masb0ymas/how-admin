import _ from 'lodash'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { env } from '~/config/env'
import AuthRepository from '~/data/repository/auth'

declare module 'next-auth' {
  interface User {
    idToken?: string
    provider?: string
  }
  interface Session {
    idToken?: string | undefined
    provider?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
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
    }),
    Google({
      clientId: String(env.AUTH_GOOGLE_ID),
      clientSecret: String(env.AUTH_GOOGLE_SECRET),
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          scope: 'openid profile email',
          session: {
            strategy: 'jwt',
          },
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        if (account.provider === 'credentials') {
          token.idToken = user.idToken
        }

        if (account.provider === 'google') {
          token.idToken = account.id_token
        }

        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      session.idToken = token.idToken as string
      session.provider = token.provider as string
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
})
