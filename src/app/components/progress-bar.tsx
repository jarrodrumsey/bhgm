import React, { ReactNode, useEffect } from 'react'


const ProgressBar = (props: {value:number, max:number, color:string, background: string}) => {

  return (
    <div className={`${props.background} sticky w-full h-4 top-0 z-40 drop-shadow-lg`}>
        <div 
        className={`${props.color} w-0 h-full transition-all drop-shadow-glow`}
        style={{
            width: `${props.value <= props.max ? (props.value/props.max)*100 : 100}%`,
            borderBottomRightRadius: props.value < props.max ? '1rem' : '',
            borderTopRightRadius: props.value < props.max ? '1rem' : '',
            }}
        >
        </div>
    </div>
  )
}

export default ProgressBar