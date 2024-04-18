"use client"
import moment from 'moment'
import React from 'react'
import { ClockIcon } from '../time'
import Image from 'next/image'
import { ChevronDoubleRightIcon } from '../rightArrow'
import { PlayIcon } from '../Play'
import { LockIcon } from './lock'
export type GameItem = {
    duration: number, 
    event: string, 
    console: string, 
    who: string, 
    time: string,
    imageURL: string,
}

type GameCardProps = GameItem & {index: number, activeIndex: number}

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
      rounded-md 
      overflow-hidden           
      relative
      group
      ${ props.index !== props.activeIndex ? "" : ""}
      `
    } 

    href="https://www.twitch.tv/burryheightsgaming"
    target="_blank">
        <Image src={props.imageURL} alt={`Thumnail image for ${props.event}`} width={730} height={120}
        className='absolute object-cover h-full w-full '/>
        <div className={`transition ease-in-out absolute w-full h-full z-1 backdrop-blur-sm group-hover:backdrop-blur-none  ${props.index === props.activeIndex ? 'backdrop-blur-none' : ""}`}></div>
      <div className={`h-full w-full z-10 flex flex-row justify-between items-centerbackdrop-blur-sm
      ${ props.index !== props.activeIndex ? "bg-gradient-to-r from-cyan-500/70 to-blue-500/70" : ""}
      ${ props.index === props.activeIndex ? "bg-gradient-to-r bg-stone-800/30" : ""}  
      ${ props.index < props.activeIndex ? "grayscale-[0.7]" : ""} `}
      >
        <div className=" flex flex-col items-start h-full w-fit justify-between text-nowrap p-4">
          <p className="font-bold">{props.event}</p>
          <p className="text-sm">{props.who}</p>
        </div>
        <div className="flex flex-col items-end h-full justify-between text-nowrap p-4">
          <p className="flex flex-row gap-1 items-center justify-end">
            <span>{moment.utc(props.time).local().format('dddd')}</span>
            <span>{moment.utc(props.time).local().format('hh:mm A').replace(/^(?:00:)?0?/, '')}</span>
          </p>
          <p className="flex flex-row gap-1 items-center justify-end text-sm">
            {props.duration}H 
            <ClockIcon width={20}></ClockIcon>
          </p>
        </div>
      </div>
    </a>)
}

const GameList = (props : {list:GameItem[], activeIndex: number}) => {

    const getScale = (index:number) => {
    const dif = Math.abs(props.activeIndex - index);
    const v = ((100+(Math.abs(dif) < 3 ? dif : 0)*5))
  
    //console.log(v)
    const f = v/100
    //console.log(f)

    const scale = ((dif < 3) ? f : 1).toString()
    const scale_str = "scale-[" + scale + "]";

    //console.log(scale_str);

    return dif < 3 && dif != 0 ? (scale_str) : ""
  }

  return (
    <ol className="w-full max-w-5xl items-center justify-between flex flex-col gap-3 p-24">
        {
          props.list.map((item, index) => {
            return (
            <li 
            className={`h-20 w-[30rem] rounded-md relative flex items-center

            ${index < props.activeIndex ? "bg-sky-500  " : (index === props.activeIndex ? "scale-110" : "")}
            ${index !== props.activeIndex ? getScale(index) : "" }
            transition-all cursor-pointer select-none`}  
            key={index}
            id={`game-item-${index}`}
            style={{
              opacity: index < props.activeIndex ? 
              1 : 1,
            }}
            >
              {index === props.activeIndex ? <a className='absolute left-[-72px] animate-shifting'>
                <ChevronDoubleRightIcon width={56} color='rgb(253 224 71)'/>
              </a> : <></>}
              <GameCard {...item} index={index} activeIndex={props.activeIndex}/>
              {index === props.activeIndex ? <a className='absolute right-[-72px] animate-pulse'>
                <PlayIcon width={56} color='rgb(253 224 71)'/>
              </a> : <></>}
            </li>)
            })
        }
      </ol>
  )
}

export default GameList