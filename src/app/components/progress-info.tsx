
import React, { useEffect, useState } from 'react'
import { useCountdown } from './countdown'
import moment from 'moment'

export interface CountDownItemProps {label?:string, time:string, endLabel?:string}

function clamp(num:number, min:number) {
    return num >= min ? num : min
}

const CountDownItem = (countdown: CountDownItemProps) =>
{
    const countDown = useCountdown(new Date(countdown.time))

    return (
      <div className=' em:text-xs xs:text-sm text-center h-full overflow-clip '>
          <h2 className='font-bold sm:inline-block em:hidden  '>
          {`
              ${countdown.label ?? ''} 
              ${clamp(countDown[0], 0)} days 
              ${clamp(countDown[1], 0)} hours
              ${clamp(countDown[2], 0)} minutes
              ${clamp(countDown[3], 0)} seconds
              ${countdown.endLabel ?? ''} 
          `}
          </h2>
          
          <h2 className='font-bold sm:hidden em:inline-block'>
          {`
              ${countdown.label ?? ''} 
              ${clamp(countDown[0], 0)}:${clamp(countDown[1], 0)}:${clamp(countDown[2], 0)}:${clamp(countDown[3], 0)}
              ${countdown.endLabel ?? ''} 
          `}
          </h2>
      </div>
    )
}


const ProgressInfo = (props: {countdowns: CountDownItemProps[], currentTime?:string}) => {

  const initCountdowns = props.countdowns.reverse().filter(countDown => {
    return moment.utc(props.currentTime).isBefore(moment.utc(countDown.time))
  })

  const [countDowns, setCountDowns] = useState(initCountdowns)
  
  useEffect(() => {
    const interval = setInterval(() => {
        setCountDowns(countDowns.filter(countDown => {
          return moment.utc(props.currentTime).isBefore(moment.utc(countDown.time))
        }));
    }, 10000);

    return () => clearInterval(interval);
  }, [countDowns, props.currentTime]);

  return (
    countDowns.length > 0 ? <CountDownItem {...countDowns[countDowns.length-1]}/> : <></>
  )
}

export default ProgressInfo