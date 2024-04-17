"use client"
import moment from 'moment'
import React from 'react'
import { ClockIcon } from '../time'
import Image from 'next/image'

export interface GameItem {
    duration: number, 
    event: string, 
    console: string, 
    who: string, 
    time: string,
    imageURL: string
}

const GameCard = (props : GameItem) =>
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
      relative`
    } 

    href="https://www.twitch.tv/burryheightsgaming"
    target="_blank">
      <Image src={props.imageURL} alt={`Thumnail image for ${props.event}`} width={730} height={120}
      className='absolute object-cover h-full w-full'/>
      <div className=" flex flex-col items-start h-full w-fit justify-between text-nowrap p-4 z-10">
        <p className="font-bold ">{props.event}</p>
        <p className="text-sm">{props.who}</p>
      </div>
      <div className="flex flex-col items-end h-full justify-between text-nowrap p-4 z-10">
        <p className="flex flex-row gap-1 items-center justify-end">
          <span>{moment.utc(props.time).local().format('dddd')}</span>
          <span>{moment.utc(props.time).local().format('hh:mm A').replace(/^(?:00:)?0?/, '')}</span>
        </p>
        <p className="flex flex-row gap-1 items-center justify-end text-sm">
          {props.duration}H 
          <ClockIcon width={20}></ClockIcon>
        </p>
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
            className={`h-20 w-[30rem] rounded-md 
            ${index < props.activeIndex ? "bg-sky-500" : (index === props.activeIndex ? "bg-sky-500 scale-110" : "bg-sky-800")}
            ${index !== props.activeIndex ? getScale(index) : "" }

            hover:translate-x-5 transition-all cursor-pointer select-none`}  
            key={index}
            id={`game-item-${index}`}
            style={{
              opacity: index < props.activeIndex ? 
              0.2 : 1,
            }}
            >
              <GameCard {...item}/>
            </li>)
            })
        }
      </ol>
  )
}

export default GameList