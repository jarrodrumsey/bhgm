"use client"
import React from 'react'
import ProgressBar from '../progress-bar'
import dynamic from 'next/dynamic'
import { CountDownItemProps } from '../progress-info'
const ProgressInfoNOSSR = dynamic(() => import('../progress-info'), { ssr: false })
const ProgressBarNOSSR = dynamic(()=> import('../progress-bar'), {ssr: false})

const MainBar = (props:{progressValue?:number, max?:number, countdowns:CountDownItemProps[]}) => {
  return (
    <div className="w-full sticky top-0 border-b-[1px] border-slate-800 bg-slate-900/30 z-40  backdrop-blur-lg 
    flex p-4 flex-col gap-2 ">
        {/*<button className="bg-green-400 rounded-md p-2" onClick={() => {incrementIndex()}}>Test</button>*/}
        <ProgressBarNOSSR value={props.progressValue ?? 1} max={props.max ?? 1} color="bg-gradient-to-r from-red-500 to-yellow-500" background="bg-slate-400">
            <ProgressInfoNOSSR countdowns={props.countdowns} />
        </ProgressBarNOSSR>
    </div>
  )//
}

export default MainBar
