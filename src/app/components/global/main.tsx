"use client"
import React, { ReactNode, useCallback, useEffect, useState, createContext } from 'react'
import MainBar from './main-bar'
import { Schedule } from '../../data'
import { GameItem, getActiveIndex, getStartEndTimeISO, initActiveIndex } from '../utils/schedule.utils'

import moment, { Moment } from 'moment-timezone'
import { ActiveIndexContext } from '../providers/active-index-context'


const Main = (props:{children:ReactNode}) => {

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

  useEffect(() => {

    const interval = setInterval(() => {
      const now = moment() // incrementDay(schedule)

      if(now.isAfter(moment.utc( getStartEndTimeISO(schedule[schedule.length-1]).end_time)))
      {
        setActiveIndex(a => schedule.length*2)
      }
      else if((activeIndex < schedule.length-1) && now.isSameOrAfter(moment(schedule[activeIndex+1].time)))
      {
        setActiveIndex(a => a+1)
        console.log(now.toISOString())
      }
  
    }, 1000);

    //console.log("EFFECT RERENDER")
    return () => clearInterval(interval);
  },[schedule, activeIndex, setActiveIndex, incrementDay]);

  const incrementIndex = () =>{ setActiveIndex(activeIndex+1) }

  const start_countdown = {label:"BHGM will begin in ", time: schedule[0].time, endLabel: ""}
  const   end_countdown = {label:"", time: getStartEndTimeISO(schedule[schedule.length-1]).end_time, endLabel: " remaining of BHGM X"}

  return (
    <ActiveIndexContext.Provider value={activeIndex}>
        <MainBar countdowns={[start_countdown, end_countdown]} progressValue={activeIndex} max={schedule.length-1}></MainBar>
        {props.children}
    </ActiveIndexContext.Provider>
  )
}

export default Main