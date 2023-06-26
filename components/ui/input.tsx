import * as React from 'react'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactElement<LucideIcon>
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, ...props }, ref) => {
    return (
      <div className='relative'>
        <input
          type={type}
          className={cn(
            'flex w-full rounded-lg border border-_gray-border bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-_gray-C2C2C2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-_gray-C2C2C2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            { 'pl-4 pr-11': Icon },
            className
          )}
          ref={ref}
          {...props}
        />
        {Icon && (
          <div className='absolute inset-y-0 right-0 text-_gray-C2C2C2 flex items-center pr-4 pointer-events-none'>
            {Icon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
