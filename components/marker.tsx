import { cn } from '@/lib/utils'
import { type Status } from '@/types'

type MarkerProps = {
  label: Status | string
  className?: string
} & ({ type?: 'marker' } | { type?: 'badge', value: number })

export function Marker (props: MarkerProps) {
  const { type = 'marker' } = props
  return (
        <div
            className={cn('h-2 rounded-full', {
              'bg-green-500': props.label === 'NO_DR',
              'bg-yellow-500': props.label === 'MILD',
              'bg-yellow-700': props.label === 'MODERATE',
              'bg-red-500': props.label === 'SEVERE',
              'bg-red-700': props.label === 'PROLIFERATIVE',
              'w-2 mr-2': type === 'marker'
            }, props.className)}
            style={{ width: props.type === 'badge' ? `${(props.value)}%` : undefined }}
        />
  )
}
