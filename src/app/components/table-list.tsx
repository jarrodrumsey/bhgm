import React, { useState } from 'react'
import { DurationInfo, GameItem } from './game-list'

import { getSchedule } from '../utils/schedule.utils'
import moment from 'moment-timezone'

const TimeInfo = (props: {time:string, className?:string}) => {

    const day = moment.utc(props.time).local().format('dddd')
    const time= moment.utc(props.time).local().format('hh:mm A').replace(/^(?:00:)?0?/, '')
    const timeZone = moment.tz.guess()
    const timeZoneOffset = new Date(props.time).getTimezoneOffset();
  
    const abr = moment.tz.zone(timeZone)?.abbr(timeZoneOffset)
  
    return <div className={`text-nowrap inline-block ${props.className ?? ''}`}>
              <span>{time +" (" + abr + ")"}</span>
            </div>
}

const TableList = (props: {list: GameItem[], activeIndex:number}) => {

  const [schedule] = useState(getSchedule(props.list))
  let index = -1
  
  return (
    <div className='flex flex-col p-5'>{
      schedule.map((group: {day:string, list:GameItem[]}, day_number:number) => { 
        return(<div key={day_number} id={`day-${day_number}`} 
        className='flex em:flex-col xs:flex-row-reverse py-2 border-b-[2px] border-sky-500' >
          <h2 className='          
          em:[writing-mode:horizontal-lr] 
          xs:[writing-mode:vertical-lr] 
          p-2 flex justify-between  border-sky-900 border-[1px] rounded-lg'>
            {group.day + " / " + moment.utc(group.list[0].time).local().format('MMMM Do')}
          </h2>
          <ol className='w-full flex flex-col items-start text-sm' >
            {
              group.list.map((item, listIndex) => {

                index++
                
                return (
                <li 
                id={`game-item-${index}`}
                className={` w-full p-1 relative flex gap-1
                ${listIndex === group.list.length-1 ? "" : "border-b-[1px] border-sky-900"}  `} key={index}>
                    <div className={`flex flex-col gap- w-full h-full justify-center transition-all
                    ${props.activeIndex === index ? 'bg-red-500 rounded-md px-2 ' : ''}
                    `}>
                        <h3 className={`w-full flex em:flex-col xs:flex-row em:items-center xs:items-start justify-between text-xs
                        ${props.activeIndex === index ? 'font-bold' : ''}
                        `}>
                            <span className='font-bold em:w-min em:text-nowrap xs:w-full xs:text-wrap'>{item.event}</span>
                            <TimeInfo time={item.time} />    
                        </h3>
                        <p className={`w-full flex flex-wrap justify-between  items-center text-xs text-gray-500
                        ${props.activeIndex === index ? 'text-gray-100' : ''}`}>
                            <span className='w-fit'>{item.who}</span>
                            <DurationInfo duration={item.duration} className='text-xs' />
                        </p>
                        
                    </div>
                    <div className={` text-xs [writing-mode:vertical-rl]
                        ${props.activeIndex === index ? "drop-shadow-lg block" : "hidden"}`}>
                        <span className={`bg-red-500 p-2 rounded-md block text-wrap uppercase w-full text-center font-bold text-xs
                        ${props.activeIndex === index ? "w-fit h-full" : "w-0 h-0"}`}>LIVE</span>
                    </div>
       
                </li>)
                })}
          </ol>
        </div>)})
    }</div>
  )  
}
export default TableList