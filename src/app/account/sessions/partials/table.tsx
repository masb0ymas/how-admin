'use client'

import { useCallback, useEffect, useState } from 'react'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { SessionEntity } from '~/data/entity/session'
import { findSessions } from '../action'
import { columns } from './columns'

export default function SessionsTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [sessions, setSessions] = useState<SessionEntity[]>([])

  const getSessions = useCallback(async () => {
    const { data } = await findSessions()
    setSessions(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getSessions()
  }, [getSessions])

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={sessions}
      baseUrl="/account/sessions"
      isEdit={false}
      isDelete={false}
    />
  )
}
