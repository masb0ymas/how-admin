import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'
import AppLayout from '~/components/layout'
import { auth } from '~/lib/auth'

type IProps = PropsWithChildren

export default async function WebinarLayout({ children }: IProps) {
  const session = await auth()

  if (!session?.user) {
    redirect('/sign-in')
  }

  return <AppLayout>{children}</AppLayout>
}
