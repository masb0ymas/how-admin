'use client'

import { Title, TitleProps } from '@mantine/core'
import { PropsWithChildren } from 'react'

type IProps = TitleProps & PropsWithChildren

export default function MyTitle(props: IProps) {
  return (
    <Title size={26} fw={600} {...props}>
      {props.children}
    </Title>
  )
}
