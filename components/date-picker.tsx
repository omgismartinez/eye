'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { es } from 'date-fns/locale'

interface DatePickerProps {
  align?: 'center' | 'start' | 'end'
  currentDate?: Date | undefined
  onSelect?: (date: Date) => void
  className?: string
}

export function DatePicker ({
  align = 'start',
  currentDate,
  onSelect,
  className
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(currentDate)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'secondary'}
          className={cn(
            'pl-3 text-left font-normal text-sm w-full',
            !date && 'text-muted-foreground',
            className
          )}
        >
          {date
            ? format(date, 'PPP', { locale: es })
            : <span>Elije una fecha</span>}
          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0' align={align}>
        <Calendar
          defaultMonth={currentDate ?? new Date('2000-01-01')}
          captionLayout='dropdown'
          fromYear={1900}
          toYear={new Date().getFullYear()}
          mode='single'
          selected={date}
          onSelect={(day) => {
            if (day) {
              setDate(day)
              onSelect?.(day)
              setOpen(false)
            }
          }}
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
