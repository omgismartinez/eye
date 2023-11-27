import React from 'react'
import { Command, CommandGroup, CommandItem, CommandList } from './ui/command'
import { cn } from '@/lib/utils'
import { Input } from './ui/input'

interface AutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  values?: Set<string>
  onSelected?: (value: string) => void
}

const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ values, onSelected, ...props }, ref) => {
    const [commandValue, setCommandValue] = React.useState('')
    return (
      <Command>
        <Input
          value={commandValue}
          onChange={(e) => {
            setCommandValue(e.target.value)
            console.log(e.target.value)
          }}
          ref={ref}
          {...props}
        />
        <CommandList className={cn(commandValue.length > 3 ? 'block' : 'hidden')}>
          <CommandGroup>
            {!values?.has(commandValue) && (
              <CommandItem
                onSelect={(currentValue) => {
                  onSelected?.(currentValue)
                  setCommandValue(currentValue)
                }}
              >
                {commandValue}
              </CommandItem>
            )}
            {Array.from(values ?? []).map((value) => (
              <CommandItem
                key={value}
                onSelect={(currentValue) => {
                  onSelected?.(currentValue)
                  setCommandValue(currentValue)
                }}
              >
                {value}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    )
  }
)
Autocomplete.displayName = 'Autocomplete'

export { Autocomplete }
