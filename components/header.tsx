import { cn } from '@/lib/utils'

interface HeaderProps {
  title: string
  subtitle: string | JSX.Element
  className?: string
}

export function Header ({ title, subtitle, className }: HeaderProps) {
  return (
        <div className={cn('flex flex-col gap-6 mb-6', className)}>
            <h1 className='text-2xl font-bold text-center tracking-tight'>{title}</h1>
            <p className='text-_gray-808080 text-sm text-center'>{subtitle}</p>
        </div>
  )
}
