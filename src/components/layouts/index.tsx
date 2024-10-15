'use client'

import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { useStore } from '~/config/zustand'
import useProfile from '~/data/query/useProfile'
import VerifyPage from '../loader/VerifyPage'
import Footer from './footer'
import Header from './header'
import classes from './partials/Layout.module.css'
import Sidebar from './sidebar'

type IProps = PropsWithChildren

export default function Layout({ children }: IProps) {
  const router = useRouter()

  const { data, isLoading, isFetching } = useProfile()
  const fetchingData = isLoading || isFetching

  const removeAuthSession = useStore((state) => state.removeAuthSession)

  if (fetchingData) {
    return <VerifyPage loading={fetchingData} />
  }

  if (_.isEmpty(data) || _.isNil(data.email)) {
    removeAuthSession()
    router.push('/')
    return
  }

  return (
    <>
      <Header />

      <div style={{ display: 'flex' }}>
        <Sidebar />

        <main className={classes.main}>
          <div className={classes.section}>{children}</div>
        </main>
      </div>

      <Footer />
    </>
  )
}
