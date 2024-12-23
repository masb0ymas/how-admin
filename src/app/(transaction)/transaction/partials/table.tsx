'use client'

import { useCallback, useEffect, useState } from 'react'
import { DataTable } from '~/components/custom/data-table'
import Loader from '~/components/custom/loader'
import { TransactionEntity } from '~/data/entity/transaction'
import { findTransactions } from '../action'
import { columns } from './columns'

export default function TransactionTable() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)

  const [transactions, setTransactions] = useState<TransactionEntity[]>([])
  const [totalTransactions, setTotalTransactions] = useState(0)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const getTransactions = useCallback(async (page: number, pageSize: number) => {
    setIsFetching(true)

    const { data, total } = await findTransactions({ page: page + 1, pageSize })
    setTransactions(data)
    setTotalTransactions(total)

    setIsLoading(false)
    setIsFetching(false)
  }, [])

  useEffect(() => {
    getTransactions(pageIndex, pageSize)
  }, [getTransactions, pageIndex, pageSize])

  const onPageChange = useCallback((page: number) => setPageIndex(page), [])
  const onPageSizeChange = useCallback((pageSize: number) => setPageSize(pageSize), [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <DataTable
      columns={columns}
      data={transactions}
      total={totalTransactions}
      baseUrl="/transaction"
      isAdd={false}
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
