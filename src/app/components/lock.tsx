import React from 'react'
import { LockClosedIcon } from './icons/LockClosed'
import { LockOpenIcon } from './icons/LockOpen'

export const LockIcon = (isOpen : boolean) => {

  return (
    <div className='transition-all animate-spin'>
        {!isOpen && <LockClosedIcon/>}
        {isOpen && <LockOpenIcon className='drop-shadow-glow'/>}
    </div>
  )
}