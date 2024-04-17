"use client"

import Image from "next/image";
import {Schedule} from "./data";
import moment from "moment";
import { ClockIcon } from "./time";
import { useEffect, useState } from "react";
import GameList, { GameItem } from "./components/game-list";
import ProgressBar from "./components/progress-bar";

const scrollToGame = (index:number) => {
  const element = document.getElementById(`game-item-${index}`);
  if(element){
    element.scrollIntoView({behavior:'smooth', block: 'center', inline: 'center'})
  }
};

export default function Home() {

  const date = "2024-05-03T22:45:00.000Z";

  const getDeltaTime = (time : string) => { return (new Date(date).getTime() - new Date(time).getTime())}

  const getActiveIndex = (schedule : GameItem[]) => {
    //Get the first index which we haven't passed, one less than that is our active index.
    return schedule.findIndex(g => {return getDeltaTime(g.time) <= 0}) 
  }

  const [activeIndex, setActiveIndex] = useState(getActiveIndex(Schedule));

  useEffect(()=>{
    scrollToGame(activeIndex+1)
  })

  const incrementIndex = () =>{
    for(let i = 0; i< Schedule.length-6; i++)
      {
        setActiveIndex(i => i+1);
      }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between  bg-stone-800">
      <button className="absolute h-30 w-full" onClick={() => {incrementIndex()}}>CLICK ME</button>
      <ProgressBar value={activeIndex} max={Schedule.length-1} color="bg-red-500" background="bg-slate-400"/>
      <GameList list={Schedule} activeIndex={activeIndex}/>
    </main>
  );
}
