import React, { useState } from 'react'
import { DurationInfo } from './game-list'
import { GameItem, getSchedule, DayLabel } from './utils/schedule.utils'
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

const TableItem = (props: {activeIndex?: number, index?:number, data:GameItem}) => {

  const isLive = props.activeIndex === props.index
  const data = props.data

  return(<>
    <div className={`flex flex-col gap- w-full h-full justify-center transition-all
      ${isLive ? 'bg-red-500 rounded-md px-2 ' : ''}
      `}>
          <h3 className={`w-full flex em:flex-col xs:flex-row em:items-center xs:items-start justify-between text-xs
          ${isLive ? 'font-bold' : ''}
          `}>
              <span className='font-bold em:text-center xs:text-left 2xs:text-nowrap xs:w-full xs:text-wrap'>
                {data.event}
              </span>
              <TimeInfo time={data.time} />    
          </h3>
          <p className={`w-full flex flex-wrap justify-between  items-center text-xs text-gray-500
          ${isLive ? 'text-white' : ''}`}>
              <span className='w-fit'>{data.who}</span>
              <DurationInfo duration={data.duration} className='text-xs' />
          </p>
    </div>
    <div className={` text-xs [writing-mode:vertical-rl]
        ${isLive ? "drop-shadow-lg block" : "hidden"}`}>
        <span className={`bg-red-500 p-2 rounded-md block text-wrap uppercase w-full text-center font-bold text-xs
        ${isLive ? "w-fit h-full" : "w-0 h-0"}`}>LIVE</span>
    </div>

  </>)
}

const TableList = (props: {list: GameItem[], activeIndex:number}) => {

  const [schedule] = useState(getSchedule(props.list))
  let index = -1
  
  return (
    <div className='flex flex-col p-5'>{
      schedule.map((group: {day:string, list:GameItem[]}, day_number:number) => { 
        return(<div key={day_number} id={`day-${day_number}`} 
        className='flex em:flex-col xs:flex-row-reverse py-2 border-b-[2px] border-sky-500' >
          <DayLabel day={group.day} time={group.list[0].time}/>
          <ol className='w-full flex flex-col items-start text-sm' >
            {
              group.list.map((item, listIndex) => {

                index++
                const isLast = listIndex === group.list.length-1

                return (
                  <li 
                  id={`game-item-${index}`} 
                  key={index}
                  className={` w-full p-1 relative flex gap-1 ${isLast ? "" : "border-b-[1px] border-sky-900"}  `}>
                      <TableItem data={item} activeIndex={props.activeIndex} index={index}/>
                  </li>
                )
              })}
          </ol>
        </div>)})
    }</div>
  )  
}
export default TableList