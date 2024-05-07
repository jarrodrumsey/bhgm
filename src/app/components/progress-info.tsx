
import React, { useEffect, useState } from 'react'
import { useCountdown } from './countdown'

interface CountDownItemProps {label?:string, time:string, endLabel?:string}

function clamp(num:number, min:number) {
    return num >= min ? num : min
}

const CountDownItem = (countdown: CountDownItemProps) =>
{
    const countDown = useCountdown(new Date(countdown.time))

    return (
      <div>
          <span className='font-bold'>
          {`
              ${countdown.label ? countdown.label : ''} 
              ${clamp(countDown[0], 0)} days 
              ${clamp(countDown[1], 0)} hours 
              ${clamp(countDown[2], 0)} minutes 
              ${clamp(countDown[3], 0)} seconds
              ${countdown.endLabel ? countdown.endLabel : ''} 
          `}
          </span>
      </div>
    )
}


const ProgressInfo = (props: {countdowns: CountDownItemProps[]}) => {

  const initCountdowns = props.countdowns.reverse().filter(countDown => {
    return new Date().getTime() < new Date(countDown.time).getTime()
  })

  const [countDowns, setCountDowns] = useState(initCountdowns)
  
  useEffect(() => {
    const interval = setInterval(() => {
        setCountDowns(countDowns.filter(countDown => {
            return new Date().getTime() < new Date(countDown.time).getTime()
        }));
    }, 10000);

    return () => clearInterval(interval);
  }, [countDowns]);

  return (
    countDowns.length > 0 ? <CountDownItem {...countDowns[countDowns.length-1]}/> : <></>
  )
}

export default ProgressInfo