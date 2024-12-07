import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { BorderBeam } from '~/components/ui/border-beam'
import { auth } from '~/lib/auth'
import SignInForm from './partials/sign-in-form'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign In - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function SignInPage() {
  const session = await auth()

  if (session?.user) {
    return redirect('/')
  }

  return (
    <div className="w-full max-w-md">
      <div className="relative rounded-xl">
        <BorderBeam borderWidth={2} />

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold font-serif tracking-wide text-gray-900">
              House of Wizard
            </h1>
            <h3 className="mt-2 text-gray-500">
              To become a great wizard, you need to login with your account first.
            </h3>
          </div>

          <SignInForm />
        </div>
      </div>
    </div>
  )
}
