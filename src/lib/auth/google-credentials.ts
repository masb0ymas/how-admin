import Google from 'next-auth/providers/google'
import { env } from '~/config/env'

export const GoogleCredentials = Google({
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
})
