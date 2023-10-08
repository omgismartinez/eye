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
              'bg-green-500': props.label === 'no dr',
              'bg-yellow-500': props.label === 'leve',
              'bg-yellow-700': props.label === 'moderada',
              'bg-red-500': props.label === 'severa',
              'bg-red-700': props.label === 'proliferativa',
              'w-2 mr-2': type === 'marker'
            }, props.className)}
            style={{ width: props.type === 'badge' ? `${(props.value)}%` : undefined }}
        />
  )
}
