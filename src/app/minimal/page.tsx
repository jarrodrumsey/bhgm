"use client"
import {Schedule} from "../data";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import TwitchStream from "../components/twitch-stream";
import { XMarkIcon } from "../components/icons/xmark";
import TableList from "../components/table-list";
import ScheduleHeader from "../components/schedule-header";
import NavButtonList from "../components/nav-button-list";
import NavLink from "../components/nav-link";
import { ActiveIndexContext } from "../components/providers/active-index-context"
import { GameItem, scrollToGame } from "../components/utils/schedule.utils";

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


export default function Page() {

  const activeIndex = useContext(ActiveIndexContext)
  const schedule : GameItem[] = Schedule
  const [showVideo, setShowVideo] = useState(activeIndex === schedule.length);

  useEffect(() => {
    activeIndex >= schedule.length ? setShowVideo(true) : null
    scrollToGame(activeIndex) 
  }, [activeIndex, schedule.length])

  return (
    <main className="flex min-h-screen box-border flex-col items-center bg-rich-sky relative">
      <ScheduleHeader>
        Game Schedule
      </ScheduleHeader>
      <div className="w-full max-w-[45rem] h-full">
        <TableList list={schedule} activeIndex={activeIndex >= schedule.length ? 423 : activeIndex}/>
      </div>
      <div className="sticky bottom-0 right-0 w-full flex justify-end z-[160]">
        <NavButtonList>
            <NavLink title='Main View' href='/'/>
            <NavLink title='Incentive List' href='/incentives'/>
        </NavButtonList>
      </div>
      { showVideo && <EventOverDialog setShowVideo={setShowVideo}/>}
    </main>
  );
}
