'use client'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/tables/header'
import { predictions } from '@/components/tables/data'
import { Diagnostic } from '@/types'
import Marker from '@/components/tables/marker'

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
                <DataTableColumnHeader column={column} title={'Paciente'} />
            )
        },
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
                <DataTableColumnHeader column={column} title={'Fecha'} />
            )
        }
    },
    {
        id: 'Teléfono',
        accessorKey: 'phone',
        header({ column }) {
            return (
                <DataTableColumnHeader column={column} title={'Teléfono'} />
            )
        },
    },
    {
        id: 'Correo electrónico',
        accessorKey: 'email',
        header({ column }) {
            return (
                <DataTableColumnHeader column={column} title={'Correo electrónico'} />
            )
        }
    },
]
