"use client"
import Image from "next/image";
import {Schedule} from "./data";
import moment, { duration } from "moment";
import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useState } from "react";
import GameList, { GameItem } from "./components/game-list";
import ProgressBar from "./components/progress-bar";
import TwitchStream from "./components/twitch-stream";
import { FlagIcon } from "./components/icons/Flag";
import { XMarkIcon } from "./components/icons/xmark";
import ProgressInfo from "./components/progress-info";

import dynamic from 'next/dynamic'
const ProgressInfoNOSSR = dynamic(() => import('./components/progress-info'), { ssr: false })
 
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


const Footer = () => {
  return <div className="w-full h-16 p-2 bg-sky-950 flex flex-col justify-center items-center">
    <p>© {new Date().getFullYear()} Jarrod Rumsey | All rights reserved</p>
  </div>
}

export default function Home() {

  let schedule : GameItem[] = JSON.parse(JSON.stringify(Schedule));

  const getDeltaTime = (time : string, currentDate: Date) => { 
    return (currentDate.getTime() - new Date(time).getTime())
  }

  const [testDay, setTestDay] = useState(0);

  const incrementDay = useCallback((schedule: GameItem[]) => {
    const day = new Date(schedule[testDay]?.time);
    if(testDay <= schedule.length)
    {
      setTestDay(i => (i+1))
    }
    
    console.log(testDay)
   
    return day
  }, [testDay, setTestDay])

  //Get the first index which we haven't passed, one less than that is our active index.
  const getActiveIndex = useCallback((schedule : GameItem[], currentDate: Date) => {

    const index = schedule.findIndex(g => {
      return getDeltaTime(g.time, currentDate) < 0 
    })

    return (index === -1) ? (schedule.length-1) : index - 1
  }, [])

  const [activeIndex, setActiveIndex] = useState(getActiveIndex(schedule, new Date()));
  const [showVideo, setShowVideo] = useState(activeIndex === schedule.length);

  useEffect(() => {
    const interval = setInterval(() => {
      
      const now = new Date(); //incrementDay(schedule)
      const end = schedule[activeIndex] ? (new Date(schedule[activeIndex].time).getTime() + schedule[activeIndex].duration*1000*Math.pow(60,2)) : Infinity
  
      if(now.getTime() >= end && (activeIndex < schedule.length))
      {
        setActiveIndex(a => a+1)
        console.log(now.toISOString())
      }
    }, 10000);
    return () => clearInterval(interval);
  },[getActiveIndex, schedule, activeIndex, incrementDay, setActiveIndex]);

  useEffect(() => {
    activeIndex >= schedule.length ? setShowVideo(true) : null
    scrollToGame(activeIndex) 
  }, [activeIndex, schedule.length])

  const incrementIndex = () =>{
    setActiveIndex(activeIndex+1)
  }

  const getStartEndTimeISO = (timeslot:GameItem) : {start_time:string, end_time:string} =>
  {
    return {start_time:timeslot.time, end_time: moment.utc(timeslot.time).add(timeslot.duration, 'hours').toISOString()}
  }

  const start_countdown = {label:"", time: schedule[0].time, endLabel: " until BHGM X"}
  const   end_countdown = {label:"", time: getStartEndTimeISO(schedule[schedule.length-1]).end_time, endLabel: " remaining of BHGM X"}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between  bg-sky-950/50 relative">
      
      <div className="w-full sticky top-0
      border-b-[1px] border-slate-800 bg-slate-900/30
      z-40  backdrop-blur-lg flex  p-4 ">

        <button className="bg-green-400 rounded-md p-2" onClick={() => {incrementIndex()}}>Test</button>

        <ProgressBar value={activeIndex} max={schedule.length-1} color="bg-gradient-to-r from-red-500 to-yellow-500" background="bg-slate-400">
          <ProgressInfoNOSSR countdowns={[start_countdown, end_countdown]}/>
        </ProgressBar>
        
      </div>

      <div className="p-8 w-full max-w-[35rem]">
        <GameList className="" list={schedule} activeIndex={activeIndex >= schedule.length ? 423 : activeIndex}/>
      </div>

      { showVideo && <EventOverDialog setShowVideo={setShowVideo}/>}



      <Footer/>
    </main>
  );
}
