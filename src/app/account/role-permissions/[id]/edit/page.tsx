import React from 'react'
import { FormEdit } from '../../partials/form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit Role Permission',
  description: 'Edit Role Permission - House of Wizard',
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

export default async function RolePermissionFormEdit({ params }: IProps) {
  const { id } = await params

  return <FormEdit id={id} />
}
