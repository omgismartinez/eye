interface HeaderProps {
    title: string
    subtitle: string | JSX.Element
}

export default function Header({ title, subtitle }: HeaderProps) {
    return (
        <div className='flex flex-col gap-6 mb-6'>
            <h1 className='text-2xl font-bold text-center'>{title}</h1>
            <p className='text-_gray-808080 text-sm text-center'>{subtitle}</p>
        </div>
    )
}
