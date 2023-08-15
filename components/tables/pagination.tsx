import { Button } from '@/components/ui/button'
import { Table } from '@tanstack/react-table'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react'

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    const selectedRows = table.getFilteredSelectedRowModel().rows.length
    const totalRows = table.getFilteredRowModel().rows.length
    const pageCount = table.getPageCount()
    const pageIndex = table.getState().pagination.pageIndex + 1
    return (
        <div className='flex items-center justify-between sm:px-4 whitespace-nowrap'>
            <div className='hidden sm:block flex-1 text-sm text-_gray-808080'>
                {selectedRows} de{' '}
                {totalRows} fila(s) seleccionada(s)
            </div>
            <div className='flex items-center justify-between w-full sm:w-min space-x-4 sm:space-x-6 lg:space-x-8'>
                <div className='flex items-center space-x-2'>
                    <p className='text-sm font-medium'>Filas por página</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className='h-8 w-[70px]'>
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side='top'>
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex items-center space-x-2'>
                    <div className='hidden xs:block whitespace-nowrap text-sm font-medium'>
                        Página {pageIndex} de {pageCount}
                    </div>
                    <Button
                        variant='outline'
                        className='hidden h-8 w-8 p-0 lg:flex'
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className='sr-only'>Ir a la primera página</span>
                        <ChevronsLeft className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='h-8 w-8 p-0'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className='sr-only'>Go to previous page</span>
                        <span className='sr-only'>Ir a la página anterior</span>
                        <ChevronLeft className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='h-8 w-8 p-0'
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className='sr-only'>Ir a la página siguiente</span>
                        <ChevronRight className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='hidden h-8 w-8 p-0 lg:flex'
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className='sr-only'>Ir a la última página</span>
                        <ChevronsRight className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    )
}