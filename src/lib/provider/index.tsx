import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import WrapperNProgress from './WrapperNProgress'
import WrapperReactQuery from './WrapperReactQuery'

type IProps = PropsWithChildren

export default function Provider({ children }: IProps) {
  return (
    <SessionProvider>
      <WrapperReactQuery>
        <WrapperNProgress>
          {children}
          <Toaster position="top-center" reverseOrder={true} />
        </WrapperNProgress>
      </WrapperReactQuery>
    </SessionProvider>
  )
}
