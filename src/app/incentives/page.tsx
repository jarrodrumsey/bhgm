"use client"
import React, { useCallback, useEffect, useState } from 'react'
import ProgressBar from '../components/progress-bar';
import ScheduleHeader from '../components/schedule-header';
import IncentiveList from '../components/incentive-list';
import { INCENTIVES, Schedule } from '../data';
import dynamic from 'next/dynamic';
import { getStartEndTimeISO, initActiveIndex } from '../components/utils/schedule.utils';
import { GameItem } from '../components/game-list';
import moment, { Moment } from 'moment-timezone';
import NavLink from '../components/nav-link';
import NavButtonList from '../components/nav-button-list';
const ProgressInfoNOSSR = dynamic(() => import('../components/progress-info'), { ssr: false })

const Page = () => {
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
    
      let currentTime = moment();
    
      const [activeIndex, setActiveIndex] = useState(initActiveIndex(schedule, currentTime));
    
      useEffect(() => {
    
        const interval = setInterval(() => {
          const now = moment()
          if(now.isAfter(moment.utc( getStartEndTimeISO(schedule[schedule.length-1]).end_time)))
          {
            setActiveIndex(a => schedule.length*2)
          }
          else if((activeIndex < schedule.length-1) && now.isSameOrAfter(moment(schedule[activeIndex+1].time)))
          {
            setActiveIndex(a => a+1)
          }
        }, 1000);
        return () => clearInterval(interval);
      },[schedule, activeIndex, setActiveIndex]);
    
    const start_countdown = {label:"BHGM will begin in ", time: Schedule[0].time, endLabel: ""}
    const   end_countdown = {label:"", time: getStartEndTimeISO(Schedule[Schedule.length-1]).end_time, endLabel: " remaining of BHGM X"}
  
    return (
        <main className={`flex h-[calc(100vh-4rem)] box-border flex-col items-center bg-rich-sky relative`}>
          
          <div className="w-full sticky top-0
          border-b-[1px] border-slate-800 bg-slate-900/30
          z-40  backdrop-blur-lg flex  p-4 flex-col gap-2 ">

            <ProgressBar value={activeIndex} max={Schedule.length-1} color="bg-gradient-to-r from-red-500 to-yellow-500" background="bg-slate-400">
            <ProgressInfoNOSSR countdowns={[start_countdown, end_countdown]}  />
            </ProgressBar>
            
          </div>
    
          <ScheduleHeader>
            Incentive List
          </ScheduleHeader>
    
          <div className="w-full max-w-[35rem] h-full">
            <IncentiveList className="" list={INCENTIVES}/> {/** 423 to leave list (423 was just a random number) */}
          </div>
    
          <div className="sticky bottom-0 right-0 w-full flex justify-end z-[160]">
    
            <NavButtonList>
                <NavLink title='Main View' href='/'/>
                <NavLink title='Simple View' href='/minimal'/>
            </NavButtonList>

          </div>

        </main>
      );
}

export default Page