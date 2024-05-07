import React, { ReactNode, useEffect } from 'react'
import { FlagIcon } from './icons/Flag'
import { TrophyIcon } from './icons/trophy'
import { StarIcon } from './icons/star'


const ProgressBar = (props: {value:number, max:number, color:string, background: string}) => {

  return (
    <div className='w-full sticky top-0 p-4 z-40 flex gap-4'>
      <StarIcon width={24} className={`${props.value >= 0 ? " text-yellow-500" : ""}`}/>
      <div className={`${props.background} w-full h-6 top-0 rounded-full drop-shadow-lg border-2 border-slate-900`}>
          <div 
          className={`${props.color} w-0 h-full transition-all drop-shadow-glow rounded-[inherit]`}
          style={{
              width: `${props.value <= props.max ? (props.value/props.max)*100 : 100}%`,
              borderBottomRightRadius: props.value < props.max ? '1rem' : '',
              borderTopRightRadius: props.value < props.max ? '1rem' : '',
              }}
          >
          </div>
      </div>
      <TrophyIcon width={24} className={`${props.value >= props.max ? "drop-shadow-simiar text-yellow-500" : ""}`}/>
    </div>
  )
}

export default ProgressBar