'use client'

import { ColumnDef } from '@tanstack/react-table'
import ColumnSorted from '~/components/custom/data-table/column-sorted'
import { RoleEntity } from '~/data/entity/role'

export const columns: ColumnDef<RoleEntity>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <ColumnSorted column={column} title="Name" />,
  },
]
