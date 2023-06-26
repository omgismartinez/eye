import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { Table } from '@tanstack/react-table'
import { DataTableFacetedFilter } from './faceted'
import { predictions } from '../data/data'

interface DataTableFilterProps<TData> {
    table: Table<TData>
}

export function DataTableFilter<TData>({ table }: DataTableFilterProps<TData>) {
    const isFiltered =
        table.getPreFilteredRowModel().rows.length >
        table.getFilteredRowModel().rows.length

    return (
        <div className='flex items-center justify-between mt-4'>
            <div className='flex flex-1 items-center space-x-2'>
                <Input
                    icon={<Search size={18} />}
                    placeholder='Buscar por paciente'
                    value={(table.getColumn('Paciente')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('Paciente')?.setFilterValue(event.target.value)
                    }
                    className='h-8 w-[150px] lg:w-[250px]'
                />
                {table.getColumn('Predicción') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('Predicción')}
                        title='Predicción'
                        options={predictions}
                    />
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
            {/* <DataTableViewOptions table={table} /> */}
        </div>
    )
}
