'use client'

import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react'
import { Table } from '@tanstack/react-table'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

interface IProps<TData> {
  table: Table<TData>
  total: number
  pageSize?: number
  pageIndex?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  isLoading?: boolean
  pageSizeOptions?: number[]
}

export default function DataTablePagination<TData>({
  table,
  total,
  pageSize = 10,
  pageIndex = 0,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: IProps<TData>) {
  const currentPage = pageIndex + 1
  const totalPages = Math.ceil(total / pageSize)

  const handlePageChange = (newPage: number) => {
    onPageChange?.(newPage)
    table.setPageIndex(newPage)
  }

  const handlePageSizeChange = (newSize: number) => {
    onPageSizeChange?.(newSize)
    table.setPageSize(newSize)
    handlePageChange(0) // Reset to first page when changing page size
  }

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of {total} row(s) selected.
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" disabled={isLoading}>
                {pageSize}
                <IconChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {pageSizeOptions.map((size) => (
                <DropdownMenuCheckboxItem
                  key={size}
                  className="capitalize"
                  checked={pageSize === size}
                  onClick={() => handlePageSizeChange(size)}
                >
                  {size}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages || 1}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(0)}
            disabled={isLoading || currentPage === 1}
          >
            <IconChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={isLoading || currentPage === 1}
          >
            <IconChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={isLoading || currentPage >= totalPages}
          >
            <IconChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={isLoading || currentPage >= totalPages}
          >
            <IconChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
