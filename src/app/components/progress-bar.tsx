
import React, { ReactNode } from 'react'
import { TrophyIcon } from './icons/trophy'
import { StarIcon } from './icons/star'


const ProgressBar = (props: {children?:ReactNode, value:number, max:number, color:string, background: string}) => {

  return (
    <div className='w-full flex items-center justify-center gap-2'>
      <div className='w-auto  em:hidden xs:block'>
        <StarIcon width={24} aria-label='Countdown START' className={`${props.value >= 0 ? " text-yellow-500" : ""}`}/>
      </div>
      <div className={`${props.background} w-full h-fit max-h-10 top-0 rounded-full drop-shadow-lg relative `}>
          <div 
          className={`${props.color} absolute top-0 left-0 w-0 h-full transition-all drop-shadow-glow rounded-[inherit] -z-10`}
          style={{
              width: `${props.value <= props.max ? (props.value/props.max)*100 : 100}%`,
              borderBottomRightRadius: props.value < props.max ? '1rem' : '',
              borderTopRightRadius: props.value < props.max ? '1rem' : '',
              }}
          >
          </div>
          <div className='w-full h-full flex flex-row em:justify-between xs:justify-center px-2 em:py-0 em:items-start xxs:items-center sm:py-2   '>
            <div className='w-auto em:hidden 2xs:block xs:hidden relative'>
              <StarIcon width={24} aria-label='Countdown START' className={`${props.value >= 0 ? " text-yellow-500" : ""}`}/>
            </div>
            {props.children}
            <div className='w-auto em:hidden 2xs:block xs:hidden relative'>
              <TrophyIcon width={24} aria-label='Countdown FINISH' className={`${props.value >= props.max ? "drop-shadow-simiar text-yellow-500" : ""}`}/>
            </div>
          </div>
      </div>
      <div className='w-auto em:hidden xs:block'>
        <TrophyIcon width={24} aria-label='Countdown FINISH' className={`${props.value >= props.max ? "drop-shadow-simiar text-yellow-500" : ""}`}/>
      </div>
    </div>
  )
}

export default ProgressBar