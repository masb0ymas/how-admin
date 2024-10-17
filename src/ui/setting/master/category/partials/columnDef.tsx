'use client'

import { DataTableColumn } from 'mantine-datatable'
import { CategoryEntity } from '~/data/entity/category'

export const columnCategory: DataTableColumn<CategoryEntity>[] = [
  {
    accessor: 'name',
    title: 'Name',
  },
]
