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
  open?: boolean
}

const LabelInfoForm = ({
  className,
  icon: Icon,
  children,
  open
}: LabelInfoFormProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger>
        <Button
          asChild
          variant={'ghost'}
          className={cn('w-6 h-6 p-1', {
            'bg-[#0070f3] hover:bg-[#0070f3]/80': isOpen
          })}
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
