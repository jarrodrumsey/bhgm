"use client"

import React, { ReactNode } from 'react'
import Image from 'next/image'


export type IncentiveItem = {
    amount: number, 
    title: string, 
    imageURL: string,
}

type IncentiveCardProps = IncentiveItem & {index: number, className?: string}

const CardLabel = (props: {children?:ReactNode, className?: string}) =>
{
  return <span className={`${props.className}`}>
    {props.children}
  </span>
}

function numberWithCommas(x:number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const IncentiveCard = (props : IncentiveCardProps) =>
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
      `
    } 

    href="https://www.twitch.tv/burryheightsgaming"
    target="_blank">
        <Image src={props.imageURL} alt={`Thumnail image for ${props.title} incentive`} width={730} height={120} placeholder='blur' blurDataURL={props.imageURL}
        className={`absolute object-cover h-full w-full opacity-50`}/>
        
   
        <div className={`h-full w-full flex flex-col justify-center absolute left-0 top-0 transition-all bg-gradient-to-b from-black/20 to-white/0 `}>
     
        {/*<div className={`parallelogram absolute top-0 left-0 w-full h-full  transition-all drop-shadow-2xl z-[-1]
         ${ props.index === props.activeIndex ? "bg-stone-900/60" : "bg-gradient-to-b from-stone-900/90 to-stone-900/0 from-50% to-50%"}
        `}/>*/}

        <h2 
        className={`flex px-4 transition-all text-sm font-bold z-[1]  py-2
        em:flex-col em:items-center em:test-xs
        xs:flex-row xs:items-start xs:justify-between `}>
          <CardLabel className=' text-md items-start em:text-center xs:text-left'>{props.title}</CardLabel>
          <CardLabel className={`flex flex-row gap-1 items-start justify-end `}>${numberWithCommas(props.amount)}</CardLabel>
        </h2>

      </div>
    </a>)
}

const IncentiveList = (props : {list:IncentiveItem[], className?:string}) => {

  return (
  <div className={`flex gap-3 p-3`} >

    <ol className={`${props.className ? props.className : ''} w-full items-center justify-between flex flex-col gap-3 `}>
    {
      props.list.map((item, index) => {


        
        return (
          <li 
          className={`h-16 w-full relative flex items-center transition-all cursor-pointer rounded-lg overflow-hidden`}  
          key={index}
          id={`incentive-item-${index}`}
          >

          <IncentiveCard {...item} index={index}/>
          </li>)
      })
    }
    </ol>
  </div>)
  }


export default IncentiveList