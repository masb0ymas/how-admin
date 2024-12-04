import { PropsWithChildren } from 'react'
import AppLayout from '~/components/layout'

type IProps = PropsWithChildren

export default function AccountLayout({ children }: IProps) {
  return <AppLayout>{children}</AppLayout>
}
