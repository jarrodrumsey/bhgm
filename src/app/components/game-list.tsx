"use client"

import moment from 'moment-timezone';
import React, { ReactNode, useState } from 'react'
import { ClockIcon } from './icons/time'
import Image from 'next/image'
import { DoneIcon } from './icons/done';
import { getSchedule } from '../utils/schedule.utils';
export type GameItem = {
    duration: number, 
    event: string, 
    console: string, 
    who: string, 
    time: string,
    imageURL: string,
}

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
  return <span className={`${props.className}`}>
    {props.children}
  </span>
}

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

export const DurationInfo = (props: {duration:number, className?:string}) => {
  return (
    <CardLabel className={`flex flex-row gap-1 items-center justify-end text-sm ${props.className ? props.className : ''}`}>
      <span aria-label='hours'>{props.duration}H</span>
      <ClockIcon width={20}></ClockIcon>
    </CardLabel>)
}

const GameCard = (props : GameCardProps) =>
{

  return (
  <a 
    className=
    {
      `w-full h-full 
      flex flex-row
      justify-between items-center 
      overflow-hidden           
      relative 
      texture
      group
      ${props.className ? props.className : ""}
      ${ props.index < props.activeIndex ? " rounded-l-md" : "rounded-md"}
      `
    } 

    href="https://www.twitch.tv/burryheightsgaming"
    target="_blank">
        <Image src={props.imageURL} alt={`Thumnail image for ${props.event}`} width={730} height={120}
        className={`absolute object-cover h-full w-full
        ${ props.index < props.activeIndex ? " grayscale-[1] brightness-50" : ""}
        ${ props.index !== props.activeIndex ? " opacity-50" : ""} `}/>
        
        <div className={`h-full w-full flex flex-col absolute left-0 top-0 transition-all 
        ${ props.index < props.activeIndex ? "" : ""}
        ${ props.index === props.activeIndex ? "" : ""}  
        ${ props.index !== props.activeIndex ? "" : ""}
        `}
        >
     
        {/*<div className={`parallelogram absolute top-0 left-0 w-full h-full  transition-all drop-shadow-2xl z-[-1]
         ${ props.index === props.activeIndex ? "bg-stone-900/60" : "bg-gradient-to-b from-stone-900/90 to-stone-900/0 from-50% to-50%"}
        `}/>*/}

        <h2 
        className={`flex px-4 transition-all text-sm font-bold z-[1] bg-gradient-to-b from-black/90 to-white/0 
        ${ props.index === props.activeIndex ? "pt-2" : "py-2"}
        em:flex-col em:items-center em:test-xs
        xs:flex-row xs:items-start xs:justify-between `}>
          <CardLabel className=' text-md items-start em:text-center xs:text-left'>{props.event}</CardLabel>
          <CardLabel className={`flex flex-row gap-1 items-start justify-end `}>
            <TimeInfo time={props.time}/>
            <span className='em:flex xs:hidden'>-</span><DurationInfo duration={props.duration} className='em:visible xs:hidden'/>
          </CardLabel>

        </h2>

        <h3 className={`flex w-full px-4 h-full transition-all z-[1] items-end text-sm font-semibold justify-center
        ${props.index === props.activeIndex ? "pb-2" : "em:py-0 xs:py-2"}
        `}>
          <CardLabel className='em:w-fit xs:w-full'>{props.who}</CardLabel>
          <DurationInfo duration={props.duration} className="em:hidden xs:flex"/>
        </h3>
      </div>
    </a>)
}

const GameList = (props : {list:GameItem[], activeIndex: number, className?:string}) => {



  const [schedule] = useState(getSchedule(props.list))
  let index = -1
  
  return (
    <div className='grid h-full'>{
      schedule.map((group: {day:string, list:GameItem[]}, day_number:number) => { 
        return(<div 
          key={day_number} 
          id={`day-${day_number}`} 
          className={`flex  em:flex-col xs:flex-row-reverse gap-3 p-3 
          ${day_number !== schedule.length-1 ? "border-b-[1px]" : "border-none" }  border-sky-900`} >
          <h2 className='
          em:[writing-mode:horizontal-lr] 
          xs:[writing-mode:vertical-lr] 
          p-2 flex justify-between  border-sky-900 border-[1px] rounded-lg'>
            {group.day + " / " + moment.utc(group.list[0].time).local().format('MMMM Do')}
          </h2>
          <ol className={`${props.className ? props.className : ''} w-full items-center justify-between flex flex-col gap-3 `}>
            {
              group.list.map((item) => {

                index++

                const isLive = index === props.activeIndex;
                
                return (
                <li 
                className={`h-24 w-full relative flex items-center transition-all cursor-pointer rounded-lg overflow-hidden   
                ${index < props.activeIndex ? "" : (isLive ? "" : '')}`}  
                key={index}
                id={`game-item-${index}`}
                >
                  <LiveContainer isLive={isLive}>
                    <GameCard {...item} index={index} activeIndex={props.activeIndex}/>
                  </LiveContainer>
                  <div 
                  className={`aspect-square grid place-items-center h-full transition-all ease-in-out drop-shadow-glow
                  ${index<props.activeIndex ? 
                    ' em:opacity-100 em:w-full em:absolute em:left-0 em:top-0 em:bg-transparent \
                      sm:static  sm:w-auto sm:bg-gray-800 `}' : 
                    ' em:opacity-0 \
                      sm:${` w-0 bg-gray-800 `}'}  `}>
                    <DoneIcon width={48} className='drop-shadow-glow rounded-full text-yellow-400'/>
                    {/*<DoneIcon width={48} className={`drop-shadow-glow rounded-full text-yellow-400`}/> ${index<props.activeIndex ? 'w-auto h-full ' : 'w-0'} CONDITIONALLY STYLE WHAT ICON IS SHOWN, MAKE BG match LIVE RED on active.*/}
                  </div>
          
      
                </li>)
                })}
          </ol>
        </div>)})
    }</div>
  )  
}

export default GameList