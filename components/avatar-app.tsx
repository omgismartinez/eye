import {
  Avatar as AvatarUi,
  AvatarImage,
  AvatarFallback
} from './ui/avatar'

export function AvatarApp () {
  return (
    <div className='flex items-center gap-3'>
      <AvatarUi>
        <AvatarImage src={''} />
        <AvatarFallback>
        </AvatarFallback>
      </AvatarUi>
      <h3 className='font-bold'>Eye</h3>
    </div>
  )
}
