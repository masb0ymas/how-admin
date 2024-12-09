'use client'

import { useCallback, useEffect, useState } from 'react'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { SessionEntity } from '~/data/entity/session'
import { findSessions } from '../action'
import { columns } from './columns'

export default function SessionsTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)

  const [sessions, setSessions] = useState<SessionEntity[]>([])
  const [totalSessions, setTotalSessions] = useState(0)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getSessions = useCallback(async (page: number, pageSize: number) => {
    setIsFetching(true)

    const { data, total } = await findSessions({ page: page + 1, pageSize })
    setSessions(data)
    setTotalSessions(total)

    setIsLoading(false)
    setIsFetching(false)
  }, [])

  useEffect(() => {
    getSessions(pageIndex, pageSize)
  }, [getSessions, pageIndex, pageSize])

  const onPageChange = useCallback((page: number) => setPageIndex(page), [])
  const onPageSizeChange = useCallback((pageSize: number) => setPageSize(pageSize), [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={sessions}
      total={totalSessions}
      baseUrl="/account/sessions"
      isEdit={false}
      isDelete={false}
      pageSize={pageSize}
      pageIndex={pageIndex}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      isLoading={isFetching}
    />
  )
}
