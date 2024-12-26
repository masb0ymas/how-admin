import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import AppLayout from '~/components/layout'
import { auth } from '~/lib/auth/handler'

type IProps = PropsWithChildren

export default async function AccountLayout({ children }: IProps) {
  const session = await auth()

  if (!session?.user) {
    redirect('/sign-in')
  }

  return (
    <AppLayout>
      <div className="bg-gradient-to-br from-sidebar to-sidebar/70 p-4 sm:p-6 rounded-xl border-[1px] shadow-lg">
        {children}
      </div>
    </AppLayout>
  )
}
