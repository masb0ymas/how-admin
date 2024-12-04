'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { PropsWithChildren } from 'react'

type IProps = PropsWithChildren

export default function WrapperNProgress({ children }: IProps) {
  return (
    <>
      {children}
      <ProgressBar height="4px" color="#818cf8" options={{ showSpinner: true }} shallowRouting />
    </>
  )
}
