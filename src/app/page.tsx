"use client"
import {Schedule} from "./data";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import GameList from "./components/game-list";
import TwitchStream from "./components/twitch-stream";
import { XMarkIcon } from "./components/icons/xmark";
import ScheduleHeader from "./components/schedule-header";
import NavButtonList from "./components/nav-button-list";
import NavLink from "./components/nav-link";
import { ActiveIndexContext } from "./components/providers/active-index-context";
import { GameItem, scrollToGame } from "./components/utils/schedule.utils";
import { EventOverDialog } from "./components/event-over-dialog";


export default function SchedulePage() {

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
      <div className="w-full max-w-[35rem] h-full">
        <GameList className="" list={schedule} activeIndex={activeIndex >= schedule.length ? 423 : activeIndex}/> {/** 423 to leave list (423 was just a random number) */}
      </div>
      <div className="sticky bottom-0 right-0 w-full flex justify-end z-[160]">
        <NavButtonList>
            <NavLink title='Simple View' href='/minimal'/>
            <NavLink title='Incentive List' href='/incentives'/>
        </NavButtonList>
      </div>
      { showVideo && <EventOverDialog setShowVideo={setShowVideo}/>}
    </main>
  );
}
