import NextAuth from 'next-auth'
import { EmailCredentials } from './email-credentials'
import { GoogleCredentials } from './google-credentials'

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
  providers: [EmailCredentials, GoogleCredentials],
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
