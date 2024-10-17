'use client'

import { DataTableColumn } from 'mantine-datatable'
import { RoleEntity } from '~/data/entity/role'

export const columnRole: DataTableColumn<RoleEntity>[] = [
  {
    accessor: 'name',
    title: 'Name',
  },
]
