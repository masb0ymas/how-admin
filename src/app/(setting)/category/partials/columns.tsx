'use client'

import { ColumnDef } from '@tanstack/react-table'
import ColumnSorted from '~/components/custom/data-table/column-sorted'
import { CategoryEntity } from '~/data/entity/category'

export const columns: ColumnDef<CategoryEntity>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnSorted column={column} title="Name" />,
  },
]
