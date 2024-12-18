import { Metadata } from 'next'
import { FormEdit } from '../../partials/form'

export const metadata: Metadata = {
  title: 'Edit Private Plan',
  description: 'Edit Private Plan - House of Wizard',
  robots: {
    index: false,
    follow: false,
  },
}

type IParams = {
  id: string
}

type IProps = {
  params: Promise<IParams>
}

export default async function PrivatePlanFormEdit({ params }: IProps) {
  const { id } = await params

  return <FormEdit id={id} />
}
