"use client"

import moment from 'moment-timezone';

import React, { ReactNode, useState } from 'react'
import { ClockIcon } from './icons/time'
import Image from 'next/image'
import { ChevronDoubleRightIcon } from './icons/rightArrow'
import { PlayIcon } from './icons/play'
import { LockIcon } from './lock'
import { DoneIcon } from './icons/done';
import { TrophyIcon } from './icons/trophy';
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
    <div className={`w-full h-full flex flex-col transition-all ease-in-out ${props.isLive ? "shadow-2xl" : ""}`}>
      {props.children}
      { 
      <div className={`p-2 py-[0px] h-[0px] ${props.isLive ? 'h-min' : ''}  bg-red-500 text-sm `}>
        {props.isLive && <div className='animate-slide'>
          <span className='animate-slide font-bold'>LIVE NOW</span>
        </div>}
      </div>}
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
      group
      ${props.className ? props.className : ""}
      `
    } 

    href="https://www.twitch.tv/burryheightsgaming"
    target="_blank">
        <Image src={props.imageURL} alt={`Thumnail image for ${props.event}`} width={730} height={120}
        className={`absolute object-cover h-full w-full 
        ${ props.index < props.activeIndex ? " grayscale-[1] brightness-50" : ""} `}/>
        
        <div className={`h-full w-full flex flex-col absolute left-0 top-0 transition-all
        ${ props.index < props.activeIndex ? "backdrop-blur-[1px]" : ""}
        ${ props.index === props.activeIndex ? "bg-gradient-to-b from-sky-200/40 to-white/0" : ""}  
        ${ props.index > props.activeIndex ? "bg-stone-800/30" : ""}
        `}
        >
     
        {/*<div className={`parallelogram absolute top-0 left-0 w-full h-full  transition-all drop-shadow-2xl z-[-1]
         ${ props.index === props.activeIndex ? "bg-stone-900/60" : "bg-gradient-to-b from-stone-900/90 to-stone-900/0 from-50% to-50%"}
  `}/>*/}

        <h2 className={`flex justify-between px-4 transition-all text-sm font-bold z-[1] bg-gradient-to-b from-black/90 to-white/0 ${ props.index === props.activeIndex ? "pt-2" : "py-2"}`}>
          <CardLabel className=' text-md items-start'>{props.event}</CardLabel>
          <CardLabel className={`flex flex-row gap-1 items-start justify-end `}>
            <TimeInfo time={props.time}/>
          </CardLabel>
        </h2>

        <h3 className={`grid grid-cols-2 place-content-end px-4 h-full transition-all z-[1] text-sm font-semibold justify-self-end ${props.index === props.activeIndex ? "pb-2" : "py-2"}`}>
          <CardLabel className='place-self-start'>{props.who}</CardLabel>
          <CardLabel className={`place-self-end flex flex-row gap-1 items-center justify-end text-sm`}>
            <span aria-label='hours'>{props.duration}H</span>
            <ClockIcon width={20}></ClockIcon>
          </CardLabel>
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
        return(<div key={day_number} id={`day-${day_number}`} className='flex flex-row-reverse gap-3 p-3 border-b-[1px] border-sky-900' >
          <h2 className='[writing-mode:vertical-lr] p-2 flex justify-between border-l-[1px] border-sky-900'>
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
                ${index < props.activeIndex ? "" : (isLive ? "z-[150]" : '')}`}  
                key={index}
                id={`game-item-${index}`}
                >
                  <LiveContainer isLive={isLive}>
                    <GameCard {...item} index={index} activeIndex={props.activeIndex}/>
                  </LiveContainer>
                  <div className={`aspect-square grid place-items-center bg-gray-800
                  ${index<props.activeIndex ? 'w-auto h-full ' : 'w-0'}`}>
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