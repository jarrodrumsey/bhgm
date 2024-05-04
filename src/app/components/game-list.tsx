"use client"

import moment from 'moment-timezone';
import React, { ReactNode, useState } from 'react'
import { ClockIcon } from './icons/time'
import Image from 'next/image'
import { DoneIcon } from './icons/done';
import { GameItem, getSchedule } from './utils/schedule.utils';


type GameCardProps = GameItem & {index: number, activeIndex: number, className?: string}

const LiveContainer = (props : {isLive:boolean, children:ReactNode}) =>
{
  return(
    <div className={`relative w-full h-full flex flex-col  ${props.isLive ? "border-red-500 border-2 bg-red-500" : "border-none bg-none"}`}>
      {props.children}
      <div className={` h-[0px] ${props.isLive ? 'h-fit' : ''}  bg-red-500 text-xs`}>
        {props.isLive && <div className='animate-slide w-full flex items-center'>
          <span className='animate-slide font-bold'>LIVE NOW</span>
        </div>}
      </div>
    </div>
  )
}

const CardLabel = (props: {children?:ReactNode, className?: string}) =>
{
  return(
    <span className={`${props.className}`}>
      {props.children}
    </span>)
}

const TimeInfo = (props: {time:string}) => {

  const time= moment.utc(props.time).local().format('hh:mm A').replace(/^(?:00:)?0?/, '')
  const timeZone = moment.tz.guess()
  const timeZoneOffset = new Date(props.time).getTimezoneOffset();
  const abr = moment.tz.zone(timeZone)?.abbr(timeZoneOffset)

  return  <div className='text-nowrap inline-block'>
            <span>{time +" (" + abr + ")"}</span>
          </div>
}

export const DurationInfo = (props: {duration:number, className?:string}) => {
  return (
    <CardLabel className={`flex flex-row gap-1 items-center justify-end text-sm ${props.className ? props.className : ''}`}>
      <span aria-label='number of hours'>{props.duration}H</span>
      <ClockIcon width={20}></ClockIcon>
    </CardLabel>)
}

const GameCard = (props : GameCardProps) =>
{
  const isLive = props.index === props.activeIndex
  const eventIsOver = props.index < props.activeIndex
  
  return (
  <a 
    className=
    {
      `w-full h-full flex flex-row justify-between items-center 
      overflow-hidden relative texture group
      ${props.className ?? ''}
      ${ eventIsOver ? " rounded-l-md" : "rounded-md"}
      `
    } 

    href="https://www.twitch.tv/burryheightsgaming"
    target="_blank">
        <Image src={props.imageURL} alt={`Thumnail image for ${props.event}`} width={730} height={120} placeholder='blur' blurDataURL={props.imageURL}
          className={`absolute object-cover h-full w-full
          ${ eventIsOver ? " grayscale-[1] brightness-50" : ""}
          ${ !isLive ? " opacity-50" : ""} `}/>
        <div className='h-full w-full flex flex-col absolute left-0 top-0 transition-all'>
        <h2 
          className={`flex px-4 transition-all text-sm font-bold z-[1] bg-gradient-to-b from-black/90 to-white/0 
          ${ isLive ? "pt-2" : "py-2"}
          em:${"flex-col items-center text-xs"}
          xs:${"flex-row items-start justify-between"}`}>
            <CardLabel className=' text-md items-start em:text-center xs:text-left'>{props.event}</CardLabel>
            <CardLabel className={`flex flex-row gap-1 items-start justify-end `}>
              <TimeInfo time={props.time}/>
              <span className='em:flex xs:hidden'>-</span><DurationInfo duration={props.duration} className='em:visible xs:hidden'/>
            </CardLabel>
        </h2>
        <p 
          className={`flex w-full px-4 h-full transition-all z-[1] items-end text-sm font-semibold justify-center
          ${isLive ? "pb-2" : "em:py-0 xs:py-2"}`}>
            <CardLabel className='em:w-fit xs:w-full'>{props.who}</CardLabel>
            <DurationInfo duration={props.duration} className="em:hidden xs:flex"/>
        </p>
      </div>
    </a>)
}

const DayLabel = (props: {day:string, time:string}) => {
  return (<h2 className='
  em:[writing-mode:horizontal-lr] 
  xs:[writing-mode:vertical-lr] 
  p-2 flex justify-between  border-sky-900 border-[1px] rounded-lg'>
    {props.day + " / " + moment.utc(props.time).local().format('MMMM Do')}
  </h2>)
}

const GameList = (props : {list:GameItem[], activeIndex: number, className?:string}) => {

  const [schedule] = useState(getSchedule(props.list))
  let index = -1

  const isLast = (day_number:number) => {return day_number !== schedule.length-1}

  return (
    <div className='grid h-full'>{
      schedule.map((group: {day:string, list:GameItem[]}, day_number:number) => {        
        return(
          <div key={day_number} id={`day-${day_number}`} 
            className={`flex  em:flex-col xs:flex-row-reverse gap-3 p-3 ${isLast(day_number) ? "border-b-[1px]" : "border-none" }  border-sky-900`} >
            <DayLabel day={group.day} time={group.list[0].time}/>
            <ol className={`${props.className ?? ''} w-full items-center justify-between flex flex-col gap-3 `}>
              {
                group.list.map((item) => {

                  index++
                  const isLive = index === props.activeIndex;
                  const eventIsOver = index < props.activeIndex

                  return (
                    <li 
                    className={`h-24 w-full relative flex items-center transition-all cursor-pointer rounded-lg overflow-hidden   
                    ${eventIsOver ? "" : (isLive ? "" : '')}`}  
                    key={index}
                    id={`game-item-${index}`}>
                      <LiveContainer isLive={isLive}>
                        <GameCard {...item} index={index} activeIndex={props.activeIndex}/>
                      </LiveContainer>
                      <div 
                      className={`aspect-square grid place-items-center h-full transition-all ease-in-out drop-shadow-glow
                      ${eventIsOver ? 
                        ' em:opacity-100 em:w-full em:absolute em:left-0 em:top-0 em:bg-transparent \
                          sm:static  sm:w-auto sm:bg-gray-800 `}' : 
                        ' em:opacity-0 \
                          sm:${` w-0 bg-gray-800 `}'}  `}>
                        <DoneIcon width={48} className='drop-shadow-glow rounded-full text-yellow-400'/>
                      </div>
                    </li>
                  )})}
            </ol>
          </div>)})
    }</div>
  )  
}

export default GameList