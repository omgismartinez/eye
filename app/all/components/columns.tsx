'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { predictions } from '../data/data'
import Marker from './marker'

export type Diagnostic = {
    id: string
    patient: string
    prediction: 'no dr' | 'leve' | 'moderado' | 'severo' | 'proliferativo'
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
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'Predicción',
        accessorKey: 'prediction',
        header: 'Predicción',
        cell: ({ row }) => {
            const prediction = predictions.find((prediction) => prediction.value === row.getValue('Predicción'))

            if (!prediction) {
                return null
            }
            return (
                <div className='flex items-center'>
                    <Badge variant='outline' className='rounded-md capitalize'>
                        <Marker value={prediction.value} />
                        {prediction.value}
                    </Badge>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        }
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
