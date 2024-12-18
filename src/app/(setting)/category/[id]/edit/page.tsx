import { Metadata } from 'next'
import { FormEdit } from '../../partials/form'

export const metadata: Metadata = {
  title: 'Edit Category',
  description: 'Edit Category - House of Wizard',
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

export default async function CategoryFormEdit({ params }: IProps) {
  const { id } = await params

  return <FormEdit id={id} />
}
