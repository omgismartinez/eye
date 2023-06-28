import { cn } from '@/lib/utils'

interface MarkerProps {
    value: string
}

export default function Marker({ value }: MarkerProps) {
    return (
        <div
            className={cn('w-2 h-2 rounded-full mr-2', {
                'bg-green-500': value === 'no dr',
                'bg-yellow-500': value === 'leve',
                'bg-yellow-700': value === 'moderado',
                'bg-red-500': value === 'severo',
                'bg-red-700': value === 'proliferativo',
            })}
        />
    )
}
