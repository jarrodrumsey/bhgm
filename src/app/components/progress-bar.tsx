
import React, { ReactNode, useEffect } from 'react'
import { FlagIcon } from './icons/Flag'
import { TrophyIcon } from './icons/trophy'
import { StarIcon } from './icons/star'


const ProgressBar = (props: {children?:ReactNode, value:number, max:number, color:string, background: string}) => {

  return (
    <div className='w-full flex items-center gap-4'>
      <label className='text-xs'></label>
      <StarIcon width={24} className={`${props.value >= 0 ? " text-yellow-500" : ""}`}/>
      <div className={`${props.background} w-full h-6 top-0 rounded-full drop-shadow-lg relative `}>
          <div 
          className={`${props.color} w-0 h-full transition-all drop-shadow-glow rounded-[inherit]`}
          style={{
              width: `${props.value <= props.max ? (props.value/props.max)*100 : 100}%`,
              borderBottomRightRadius: props.value < props.max ? '1rem' : '',
              borderTopRightRadius: props.value < props.max ? '1rem' : '',
              }}
          >
          </div>
          <div className='absolute top-0 left-0 w-full h-full flex flex-row justify-center px-4 items-center text-sm'>
            {props.children}
          </div>
      </div>
      <div>
        <TrophyIcon width={24} className={`${props.value >= props.max ? "drop-shadow-simiar text-yellow-500" : ""}`}/>
      </div>
    </div>
  )
}

export default ProgressBar