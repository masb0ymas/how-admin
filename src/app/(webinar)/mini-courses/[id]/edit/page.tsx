import { Metadata } from 'next'
import { FormEdit } from '../../partials/form'

export const metadata: Metadata = {
  title: 'Edit Webinar Mini Course',
  description: 'Edit Webinar Mini Course - House of Wizard',
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

export default async function WebinarMiniCourseFormEdit({ params }: IProps) {
  const { id } = await params

  return <FormEdit id={id} />
}
