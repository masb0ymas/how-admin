'use client'

import { PropsWithChildren } from 'react'
import Header from './header'
import classes from './partials/Layout.module.css'
import Sidebar from './sidebar'
import Footer from './footer'

type IProps = PropsWithChildren

export default function Layout({ children }: IProps) {
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
