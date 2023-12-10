'use client'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/tables/header'
import { predictions } from '@/components/tables/data'
import { Marker } from '@/components/marker'
import { type DiagnosticModel } from '@/types'
import { Maximize2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const columnsVisibility = {
  Paciente: true,
  Predicción: true,
  Fecha: true,
  Teléfono: true,
  'Correo electrónico': true,
  Género: false
}

export const columns: Array<ColumnDef<DiagnosticModel>> = [
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
    enableHiding: false
  },
  {
    id: 'Paciente',
    accessorKey: 'patient',
    header ({ column }) {
      return (
        <DataTableColumnHeader column={column} title={'Paciente'} />
      )
    },
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.patient
      return `${firstName} ${lastName}`
    },
    enableHiding: false,
    filterFn: (row, _, value) => {
      const { firstName, lastName } = row.original.patient
      return `${firstName} ${lastName}`.toLowerCase().includes(value.toLowerCase())
    }
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
        <div className='flex items-center gap-2'>
          <Link
            href={`/diagnostic/${row.original.id}`}
            className={cn(buttonVariants({
              variant: 'ghost',
              className: 'w-7 h-7 p-0 rounded-full inline-flex overflow-hidden'
            }))}
          >
            <Maximize2 size={14} />
          </Link>
          <Badge variant='outline' className='rounded-md capitalize'>
            <Marker label={prediction.value} />
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
    accessorKey: 'updatedAt',
    header ({ column }) {
      return (
        <DataTableColumnHeader column={column} title={'Fecha'} />
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('Fecha'))
      return (
        <span>{date.toLocaleDateString('es', {
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })}</span>
      )
    },
    sortDescFirst: true
  },
  {
    id: 'Teléfono',
    accessorKey: 'patient.phone',
    header: 'Teléfono'
  },
  {
    id: 'C. electrónico',
    accessorKey: 'patient.email',
    header: 'Correo electrónico'
  },
  {
    id: 'Género',
    accessorKey: 'patient.gender',
    header: 'Género',
    cell: ({ getValue }) => {
      const gender = getValue() === 'M' ? 'Masculino' : 'Femenino'
      return (
        <Badge variant='outline' className='capitalize rounded-md'>
          {gender}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  }
]
