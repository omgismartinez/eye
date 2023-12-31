import { type Column } from '@tanstack/react-table'
import { ChevronsUpDown, EyeOff, SortAsc, SortDesc } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue> ({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const isSortedDesc =
    column.getIsSorted() === 'desc' &&
    column.getFirstSortDir() === 'desc'

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='-ml-3 h-8 data-[state=open]:bg-accent'
          >
            <span className='text-sm'>{title}</span>
            {isSortedDesc
              ? <SortDesc className='ml-2 h-4 w-4' />
              : column.getIsSorted() === 'asc'
                ? <SortAsc className='ml-2 h-4 w-4' />
                : <ChevronsUpDown className='ml-2 h-4 w-4' />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <SortAsc className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <SortDesc className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>
          {column.getIsSorted() && (
            <DropdownMenuItem onClick={() => column.toggleSorting(undefined)}>
              <ChevronsUpDown className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
              Ninguno
            </DropdownMenuItem>
          )}
          {column.getCanHide() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOff className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                Ocultar
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
