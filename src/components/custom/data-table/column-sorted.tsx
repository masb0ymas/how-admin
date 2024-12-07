'use client'

import { IconSelector } from '@tabler/icons-react'
import { Column } from '@tanstack/react-table'
import { Button } from '~/components/ui/button'

type IProps<TData, TValue> = {
  column: Column<TData, TValue>
  title: string
}

export default function ColumnSorted<TData, TValue>({ column, title }: IProps<TData, TValue>) {
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {title}
      <IconSelector className="ml-2 h-4 w-4" />
    </Button>
  )
}
