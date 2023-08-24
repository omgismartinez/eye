'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { type Patient } from '@/types'

import { DataTableColumnHeader } from '@/components/tables/header'
import { predictions } from '@/components/tables/data'
import { DataTableRowActions } from './actions'
import Marker from '@/components/tables/marker'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

export const columnsVisibility = {
  Paciente: true,
  Predicción: true,
  Teléfono: true,
  Edad: true,
  Sexo: true,
  Dirección: false,
  'C. electrónico': false,
  'F. Nacimiento': false,
  Ocupación: false
}

export const columns: Array<ColumnDef<Patient>> = [
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
    accessorKey: 'name',
    header ({ column }) {
      return (
                <DataTableColumnHeader column={column} title={'Paciente'} />
      )
    },
    cell ({ row }) {
      const image = row.original.image
      const name = row.original.name
      const email = row.original.email
      return (
                <div className='flex items-center space-x-4'>
                    <Avatar>
                        <AvatarImage src={image} />
                        <AvatarFallback>
                            {name
                              .split(' ')
                              .slice(0, 2)
                              .map((name) => name[0])
                              .join('')
                            }
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='text-sm font-medium leading-none'>{name}</p>
                        <p className='text-sm text-muted-foreground'>{email}</p>
                    </div>
                </div>
      )
    },
    enableHiding: false
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
                    <Badge variant='outline' className='capitalize'>
                        <Marker label={prediction.value} />
                        {prediction.value}
                    </Badge>
                </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false
  },
  {
    id: 'Teléfono',
    accessorKey: 'phone',
    header: 'Teléfono'
  },
  {
    id: 'Edad',
    accessorKey: 'age',
    header: ({ column }) => <DataTableColumnHeader column={column} title={'Edad'} />,
    cell: ({ row }) => <>{row.original.age} años</>
  },
  {
    id: 'Género',
    accessorKey: 'gender',
    header: 'Género',
    cell: ({ row }) => {
      const gender = row.original.gender === 'M' ? 'Masculino' : 'Femenino'
      return (
                <Badge variant='outline' className='capitalize'>
                    {gender}
                </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    }
  },
  {
    id: 'Dirección',
    accessorKey: 'address',
    header: 'Dirección',
    cell: ({ row }) => {
      const address = row.original.address
      return (
                <div className='grid gap-2'>
                    <HoverCard openDelay={200}>
                        <HoverCardTrigger asChild>
                            <p className='max-w-[190px] truncate'>{address}</p>
                        </HoverCardTrigger>
                        <HoverCardContent
                            align='center'
                            className='w-72 text-sm whitespace-normal'
                            side='left'
                        >
                            {address}
                        </HoverCardContent>
                    </HoverCard>
                </div>
      )
    }
  },
  {
    id: 'C. electrónico',
    accessorKey: 'email',
    header: 'Correo electrónico'
  },
  {
    id: 'F. Nacimiento',
    accessorKey: 'birthdate',
    header: 'F. Nacimiento',
    cell: ({ row }) => {
      const birthdate =
                row.original.birthdate
                  ? new Date(row.original.birthdate).toLocaleDateString()
                  : 'N/A'
      return (
                <>{birthdate}</>
      )
    }
  },
  {
    id: 'Ocupación',
    accessorKey: 'occupation',
    header: 'Ocupación'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
]
