"use client"
import Image from "next/image";
import {Schedule} from "../data";
import moment, { Moment, duration } from "moment";
import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useState } from "react";
import GameList, { GameItem } from "../components/game-list";
import ProgressBar from "../components/progress-bar";
import TwitchStream from "../components/twitch-stream";
import { FlagIcon } from "../components/icons/Flag";
import { XMarkIcon } from "../components/icons/xmark";
import ProgressInfo from "../components/progress-info";
import {AFTER_INDEX_VALUE, getActiveIndex, getDeltaTime, getStartEndTimeISO} from "../utils/schedule.utils"

import dynamic from 'next/dynamic'
import Footer from "../components/footer";
import TableList from "../components/table-list";
import Link from "next/link";
import { PlusIcon } from "../components/icons/Plus";
const ProgressInfoNOSSR = dynamic(() => import('../components/progress-info'), { ssr: false })
 
const scrollToGame = (index:number) => {
  const element = document.getElementById(`game-item-${index}`);
  if(element){
    element.scrollIntoView({behavior:'smooth', block: 'center', inline: 'center'})
  }
};

const EventOverDialog = (props: {setShowVideo: Dispatch<SetStateAction<boolean>>}) => {
  return (
  <div className="absolute h-full w-full top-0 left-0 z-[140]"> 
    <div className="sticky top-0 left-0 h-screen rounded-md self-start flex justify-center items-center w-full bg-slate-600/60 backdrop-blur-[2px]">
        <div className=" w-[50rem] h-fit bg-stone-800 p-4 rounded-lg flex flex-col gap-2">
            <div className="flex flex-row w-full justify-between">
              <h1 className="text-xl w-full font-bold">Burry Heights Gaming Maraton - 2024</h1>
              <button onClick={() => props.setShowVideo(show => !show)}><XMarkIcon width={24}/></button> 
            </div>
            <p>Event is over!</p>
            <TwitchStream channel={"burryheightsgaming"} width={800} height={600} />
        </div>
    </div>
  </div>
  )
}

const Button = (props: {children:ReactNode, link:string, target:string}) => {
  return (
  <a className="p-4 w-full grid place-items-center cursor-pointer text-white transition-all" href={props.link} target={props.target}>
    {props.children}
  </a>
  )
}

export default function Page() {

  const schedule : GameItem[] = Schedule
  const [testDay, setTestDay] = useState(-1);

  const incrementDay = useCallback((schedule: GameItem[]) => {

    const isBefore : boolean = testDay <= -1
    const isAfter : boolean = testDay >= schedule.length
    let day : Moment

    if(isBefore)      { day = moment().subtract(100, 'years') }
    else if (isAfter) { day = moment().add(100, 'years')}
    else              { day = moment.utc(schedule[testDay].time)}
  
    if(testDay < schedule.length) { 
      setTestDay(i => (i+1)); 
      console.log("TEST DAY INCREMENTED", testDay + " " + schedule.length) 
    }

    return day

  }, [testDay, setTestDay])

  const initActiveIndex = (schedule:GameItem[], currentTime: Moment) => {
    
    const start_time = schedule[0].time
    const end_time = getStartEndTimeISO(schedule[schedule.length-1]).end_time

    if (moment.utc(start_time).isSameOrAfter(currentTime))
    {
      return -1
    }
    else if(moment.utc(end_time).isBefore(currentTime))
    {
      return schedule.length*2
    }
    else
    {
      return getActiveIndex(schedule, currentTime)}
    }

  let currentTime = moment();

  const [activeIndex, setActiveIndex] = useState(initActiveIndex(schedule, currentTime));
  const [showVideo, setShowVideo] = useState(activeIndex === schedule.length);


  useEffect(() => {

    const interval = setInterval(() => {
      
      currentTime = moment()
      const now = currentTime //moment() // incrementDay(schedule)

      if(now.isAfter(moment.utc( getStartEndTimeISO(schedule[schedule.length-1]).end_time)))
      {
        setActiveIndex(a => schedule.length*2)
      }
      else if((activeIndex < schedule.length-1) && now.isSameOrAfter(moment(schedule[activeIndex+1].time)))
      {
        setActiveIndex(a => a+1)
        console.log(now.toISOString())
      }
  
    }, 100);

    console.log("EFFECT RERENDER")
    return () => clearInterval(interval);
  },[schedule, activeIndex, setActiveIndex, incrementDay]);

  useEffect(() => {
    activeIndex >= schedule.length ? setShowVideo(true) : null
    scrollToGame(activeIndex) 
  }, [activeIndex, schedule.length])

  const incrementIndex = () =>{
    setActiveIndex(activeIndex+1)
  }

  const start_countdown = {label:"BHGM will begin in ", time: schedule[0].time, endLabel: ""}
  const   end_countdown = {label:"", time: getStartEndTimeISO(schedule[schedule.length-1]).end_time, endLabel: " remaining of BHGM X"}

  return (
    <main className="flex min-h-screen box-border flex-col items-center justify-between bg-sky-950/50 relative">
      
      <div className="w-full sticky top-0
      border-b-[1px] border-slate-800 bg-slate-900/30
      z-40  backdrop-blur-lg flex  p-4 flex-col gap-2 ">

        <button className="bg-green-400 rounded-md p-2" onClick={() => {incrementIndex()}}>Test</button>

        <ProgressBar value={activeIndex} max={schedule.length-1} color="bg-gradient-to-r from-red-500 to-yellow-500" background="bg-slate-400">
          <ProgressInfoNOSSR countdowns={[start_countdown, end_countdown]} currentTime={currentTime.toISOString()} />
        </ProgressBar>
        
      </div>

        <div className="w-full max-w-[45rem] h-full">
          <TableList list={schedule} activeIndex={activeIndex >= schedule.length ? 423 : activeIndex}/>
        </div>

      <div className="sticky bottom-0 right-0 w-full flex justify-end z-[160]">

         <Link href={"/"} 
         className=" p-2 rounded-md m-5 w-min text-sm
         border-[1px] border-sky-400 
         bg-gradient-to-tr from-blue-500 bg-sky-900 text-nowrap">
         Main View
         </Link>


      </div>
      
      { showVideo && <EventOverDialog setShowVideo={setShowVideo}/>}

    </main>
  );
}
