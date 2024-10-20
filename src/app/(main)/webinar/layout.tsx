import { PropsWithChildren } from 'react'
import Layout from '~/components/layouts'

type IProps = PropsWithChildren

export default function WebinarLayout({ children }: IProps) {
  return <Layout>{children}</Layout>
}
