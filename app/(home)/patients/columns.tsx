'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/tables/header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { type PatientModel } from '@/types'
import { type Prisma } from '@prisma/client'
import { MoreHorizontal, Pen, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const columnsVisibility = {
  Paciente: true,
  Teléfono: true,
  Edad: true,
  Sexo: true,
  Dirección: false,
  'C. electrónico': false,
  'F. Nacimiento': true,
  Ocupación: false
}

export const columns: Array<ColumnDef<PatientModel>> = [
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
      const {
        user,
        firstName,
        lastName,
        email
      } = row.original

      const image = user.metadata as Prisma.JsonObject

      return (
        <div className='flex items-center space-x-4'>
          <Avatar>
            <AvatarImage src={image?.image_url as string} />
            <AvatarFallback>
              {`${firstName} ${lastName}`
                .split(' ')
                .slice(0, 2)
                .map((name) => name[0])
                .join('')
              }
            </AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium leading-none'>{firstName + ' ' + lastName}</p>
            <p className='text-sm text-muted-foreground'>{email}</p>
          </div>
        </div>
      )
    },
    filterFn: (row, _, value) => {
      const { firstName, lastName } = row.original
      return `${firstName} ${lastName}`.toLowerCase().includes(value.toLowerCase())
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
    },
    enableColumnFilter: false
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
        row.original.dob
          ? new Date(row.original.dob).toLocaleDateString()
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
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <MoreHorizontal className='h-4 w-4' />
            <span className='sr-only'>Menú abierto</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem asChild>
            <Link
              href={`/patients/${row.original.id}`}
            >
              <Pen className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Trash className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Borrar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]
