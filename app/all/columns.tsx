'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export type Diagnostic = {
    id: string
    patient: string
    prediction: 'No dr' | 'Leve' | 'Moderado' | 'Severo' | 'Proliferativo'
    date: string
    phone: string
    email: string
}

export const columns: ColumnDef<Diagnostic>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label='Select row'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'Paciente',
        accessorKey: 'patient',
        header({ column }) {
            return (
                <Button
                    size={'sm'}
                    variant={'ghost'}
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Paciente
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
    },
    {
        id: 'Predicción',
        accessorKey: 'prediction',
        header: 'Predicción',
    },
    {
        id: 'Fecha',
        accessorKey: 'date',
        header({ column }) {
            return (
                <Button
                    size={'sm'}
                    variant={'ghost'}
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Fecha
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        }
    },
    {
        id: 'Teléfono',
        accessorKey: 'phone',
        header({ column }) {
            return (
                <Button
                    size={'sm'}
                    variant={'ghost'}
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Teléfono
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
    },
    {
        id: 'Correo electrónico',
        accessorKey: 'email',
        header({ column }) {
            return (
                <Button
                    size={'sm'}
                    variant={'ghost'}
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Correo electrónico
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        }
    },
]
