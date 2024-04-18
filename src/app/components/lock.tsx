import React, { useState } from 'react'
import { LockClosedIcon } from '../LockClosed'
import { LockOpenIcon } from '../LockOpen'

export const LockIcon = (isOpen : boolean) => {

  return (
    <div className='transition-all animate-spin'>
        {!isOpen && <LockClosedIcon/>}
        {isOpen && <LockOpenIcon className='drop-shadow-glow'/>}
    </div>
  )
}