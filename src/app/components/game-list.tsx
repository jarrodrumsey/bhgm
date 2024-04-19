"use client"
import moment from 'moment'
import React, { ReactNode } from 'react'
import { ClockIcon } from './icons/time'
import Image from 'next/image'
import { ChevronDoubleRightIcon } from './icons/rightArrow'
import { PlayIcon } from './icons/play'
import { LockIcon } from './lock'
export type GameItem = {
    duration: number, 
    event: string, 
    console: string, 
    who: string, 
    time: string,
    imageURL: string,
}

type GameCardProps = GameItem & {index: number, activeIndex: number, className?: string}

const LiveButton = () => 
{
  return (
    <a href='https://twitch.tv/burryheightsgaming' target='_blank' className='absolute right-[-72px] '>
      <div className='h-full bg-red-500 p-2 rounded-md'>
        <span className='animate-pulse'>LIVE</span>
      </div>
    </a>
  )
}

const LiveContainer = (props : {isLive:boolean, children:ReactNode}) =>
{
  return(
    <div className={`w-full h-full rounded-md overflow-hidden flex flex-col`}>
      {props.children}
      {props.isLive && 
      <div className={`p-2 py-[0px] bg-red-500 text-sm`}>
        <div className='animate-slide'>
          <span className='animate-slide font-bold'>LIVE NOW</span>
        </div>
      </div>}
    </div>
  )
}

const GameCard = (props : GameCardProps) =>
{
  const backgroundImage = (imageURL : string) => {
    console.log("bg-[url(" + imageURL + ")]")
    return "bg-[url(" + imageURL + ")]"
  }

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
      ${props.className}
      `
    } 

    href="https://www.twitch.tv/burryheightsgaming"
    target="_blank">
        <Image src={props.imageURL} alt={`Thumnail image for ${props.event}`} width={730} height={120}
        className='absolute object-cover h-full w-full '/>
        <div className={`transition ease-in-out absolute w-full h-full z-1
        `}></div>
  
      <div className={`h-full w-full z-10 flex flex-col
      ${ props.index !== props.activeIndex ? "bg-gradient-to-r from-cyan-500/70 to-blue-500/70" : ""}
      ${ props.index === props.activeIndex ? "bg-gradient-to-r bg-stone-800/30" : ""}  
      ${ props.index < props.activeIndex ? "grayscale-[0.7]" : ""} `}
      >
        <div className={`flex flex-row justify-between h-full w-full items-start text-nowrap px-4 ${ props.index === props.activeIndex ? "pt-2" : "py-2"}`}>
          <p className="font-bold">{props.event}</p>
          <p className="flex flex-row gap-1 items-center justify-end">
            <span>{moment.utc(props.time).local().format('dddd')}</span>
            <span>{moment.utc(props.time).local().format('hh:mm A').replace(/^(?:00:)?0?/, '')}</span>
          </p>
        </div>

        <div className={`flex flex-row h-full justify-between items-end text-nowrap px-4 ${ props.index === props.activeIndex ? "pb-2" : "py-2"}`}>
          <p className="text-sm">{props.who}</p>
          <p className="flex flex-row gap-1 items-center justify-end text-sm">
            {props.duration}H 
            <ClockIcon width={20}></ClockIcon>
          </p>
        </div>
      </div>
    </a>)
}

const GameList = (props : {list:GameItem[], activeIndex: number}) => {
  
  return (
    <ol className="w-full max-w-5xl items-center justify-between flex flex-col gap-3">
        {
          props.list.map((item, index) => {

            const isLive = index === props.activeIndex;

            return (
            <li 
            className={`h-20 w-[30rem] rounded-md relative flex items-center transition-all cursor-pointer select-none
            ${index < props.activeIndex ? "bg-sky-500  " : (isLive ? "scale-110" : "")}`}  
            key={index}
            id={`game-item-${index}`}
            >
              <LiveContainer isLive={isLive}>
                <GameCard {...item} index={index} activeIndex={props.activeIndex}/>
              </LiveContainer>
            </li>)
            })
        }
      </ol>
  )
}

export default GameList