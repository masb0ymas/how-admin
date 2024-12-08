'use client'

import { IconEye, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react'
import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import _ from 'lodash'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Input } from '~/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import DataTablePagination from './data-table-pagination'
import DataTableViewOptions from './data-table-view-options'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  baseUrl: string
  isEdit?: boolean
  isDelete?: boolean
  onDelete?: (id: string) => void
  total: number
  pageSize?: number
  pageIndex?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  isLoading?: boolean
  pageSizeOptions?: number[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  baseUrl,
  isEdit = true,
  isDelete = true,
  onDelete,
  total,
  pageSize,
  pageIndex,
  onPageChange,
  onPageSizeChange,
  isLoading,
  pageSizeOptions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const defaultColumn: ColumnDef<TData, TValue>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="ml-1 flex items-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="ml-1 flex items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns,
    {
      id: 'actions',
      cell: ({ row }) => {
        const id = _.get(row, 'original.id', '')

        return (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <Link href={`${baseUrl}/${id}/view`}>
                  <DropdownMenuItem className="focus:cursor-pointer">
                    <IconEye className="h-4 w-4" />
                    <span>View</span>
                  </DropdownMenuItem>
                </Link>

                {isEdit && (
                  <Link href={`${baseUrl}/${id}/edit`}>
                    <DropdownMenuItem className="focus:cursor-pointer">
                      <IconPencil className="h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                  </Link>
                )}

                {isDelete && (
                  <>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="text-red-500 focus:font-semibold focus:bg-red-500 focus:text-white focus:cursor-pointer"
                      onClick={() => onDelete?.(id)}
                    >
                      <IconTrash className="h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns: defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div>
      <div className="flex gap-2 items-center py-4">
        <Input
          placeholder="Search everything..."
          value={(table.getState().globalFilter as string) ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

        <DataTableViewOptions table={table} />

        <Link href={`${baseUrl}/add`}>
          <Button className="bg-blue-500 font-semibold hover:bg-blue-500/90">
            <IconPlus className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell: Cell<TData, TValue>) => (
                    <TableCell key={cell.id}>
                      {['select', 'actions', 'is_active', 'is_blocked'].includes(cell.column.id) ? (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      ) : (
                        <span className="ml-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </span>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 2} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        table={table}
        total={total}
        pageSize={pageSize}
        pageIndex={pageIndex}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        isLoading={isLoading}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  )
}
