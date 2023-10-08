import * as React from 'react'

import {
  type LucideIcon,
  InfoIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

interface LabelInfoFormProps {
  className?: string
  icon?: LucideIcon | null
  children: React.ReactNode
}

const LabelInfoForm = ({ className, icon: Icon, children }: LabelInfoFormProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          asChild
          variant={'ghost'}
          className='w-6 h-6 p-1'
        >
          {Icon ? <Icon /> : <InfoIcon className={cn('w-4 h-4', className)} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='center'
        className='w-[260px] text-sm'
        side='top'
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

export { LabelInfoForm }
