import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { type Table } from '@tanstack/react-table'
import { DataTableFacetedFilter } from '@/components/tables/faceted'
import { DataTableViewOptions } from './view-options'
import { type DataTableFilterableColumn } from '@/types'

interface DataTableFilterProps<TData> {
  table: Table<TData>
  filterableColumns?: Array<DataTableFilterableColumn<TData>>
}

export function DataTableFilter<TData> ({ table, filterableColumns }: DataTableFilterProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length

  return (
        <div className='flex items-center justify-between mt-4'>
            <div className='flex flex-1 flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2'>
                <Input
                    icon={<Search size={18} />}
                    placeholder='Buscar por paciente'
                    value={(table.getColumn('Paciente')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                      table.getColumn('Paciente')?.setFilterValue(event.target.value)
                    }
                    className='h-8 lg:w-[250px]'
                />
                <div className='flex space-x-2'>
                  {filterableColumns?.map(
                    (column) =>
                      table.getColumn(column.title ? String(column.title) : '') && (
                        <DataTableFacetedFilter
                          key={String(column.title)}
                          column={table.getColumn(column.title ? String(column.title) : '')}
                          title={column.title}
                          options={column.options}
                        />
                      )
                  )}
                    {isFiltered && (
                        <Button
                            variant='ghost'
                            onClick={() => table.resetColumnFilters()}
                            className='h-8 px-2 lg:px-3'
                        >
                            Reiniciar
                            <X className='ml-2 h-4 w-4' />
                        </Button>
                    )}
                </div>
            </div>
            <DataTableViewOptions table={table} />
        </div>
  )
}
