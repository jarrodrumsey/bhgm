import React, { useState } from 'react'
import { GameItem } from './game-list'
import moment from 'moment'
import { getSchedule } from '../utils/schedule.utils'

const TimeInfo = (props: {time:string}) => {

    const day = moment.utc(props.time).local().format('dddd')
    const time= moment.utc(props.time).local().format('hh:mm A').replace(/^(?:00:)?0?/, '')
    const timeZone = moment.tz.guess()
    const timeZoneOffset = new Date(props.time).getTimezoneOffset();
  
    const abr = moment.tz.zone(timeZone)?.abbr(timeZoneOffset)
  
    return <div className='text-nowrap inline-block'>
              <span>{time +" (" + abr + ")"}</span>
            </div>
}

const TableList = (props: {schedule: GameItem[]}) => {

  const [schedule] = useState(getSchedule(props.schedule))
  let index = -1
  
  return (
    <div className='flex flex-col'>{
      schedule.map((group: {day:string, list:GameItem[]}, day_number:number) => { 
        return(<div key={day_number} id={`day-${day_number}`} className='flex flex-row-reverse gap-3 p-1 border-b-[1px] border-sky-900' >
          <h2 className='[writing-mode:vertical-lr] p-1 flex justify-between border-l-[1px] border-sky-900 text-xs'>
            {group.day + " / " + moment.utc(group.list[0].time).local().format('MMMM Do')}
          </h2>
          <ol className='w-full flex flex-col items-start text-xs' >
            {
              group.list.map((item) => {

                index++
                
                return (
                <li className='flex w-full justify-between' key={index}>
                    <span>{item.event}</span>
                    <TimeInfo time={item.time} />
                </li>)
                })}
          </ol>
        </div>)})
    }</div>
  )  
}
export default TableList