'use client'

import { Checkbox } from '@mantine/core'
import { DataTableColumn } from 'mantine-datatable'
import { UserEntity } from '~/data/entity/user'

export const columnUser: DataTableColumn<UserEntity>[] = [
  {
    accessor: 'fullname',
    title: 'Full Name',
  },
  {
    accessor: 'email',
    title: 'Email',
  },
  {
    accessor: 'is_active',
    title: 'Active',
    width: 80,
    render: ({ is_active }) => <Checkbox checked={is_active} label={is_active ? 'Yes' : 'No'} />,
  },
  {
    accessor: 'is_blocked',
    title: 'Blocked',
    width: 80,
    render: ({ is_blocked }) => <Checkbox checked={is_blocked} label={is_blocked ? 'Yes' : 'No'} />,
  },
  {
    accessor: 'role.name',
    title: 'Role',
  },
]
