import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { Table } from '@tanstack/react-table'
import { DataTableFacetedFilter } from '@/components/tables/faceted'
import { DataTableViewOptions } from './view-options'
import { predictions } from './data'

interface DataTableFilterProps<TData> {
    table: Table<TData>
}

export function DataTableFilter<TData>({ table }: DataTableFilterProps<TData>) {
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
                    {table.getColumn('Predicción') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('Predicción')}
                            title='Predicción'
                            options={predictions}
                        />
                    )}
                    {table.getColumn('Género') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('Género')}
                            title='Género'
                            options={[
                                { value: 'M', label: 'Masculino' },
                                { value: 'F', label: 'Femenino' },
                            ]}
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
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}
