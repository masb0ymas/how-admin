import { PropsWithChildren } from 'react'

type IProps = PropsWithChildren

export default function SignInLayout({ children }: IProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-4">
      {children}
    </main>
  )
}
