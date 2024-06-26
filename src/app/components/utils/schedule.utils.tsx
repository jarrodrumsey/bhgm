import moment, { Moment } from "moment"

export type GameItem = {
  duration: number, 
  event: string, 
  console: string, 
  who: string, 
  time: string,
  imageURL: string,
}

export const AFTER_INDEX_VALUE = Infinity
export const getStartEndTimeISO = (timeslot:GameItem) : {start_time:string, end_time:string} =>
    {
      return {start_time:timeslot.time, end_time: moment.utc(timeslot.time).add(timeslot.duration, 'hours').toISOString()}
    }

export const getDeltaTime = (time : string, currentDate: Date) => { 
    return (currentDate.getTime() - new Date(time).getTime())
  }

export const getActiveIndex = (schedule : GameItem[], currentTime: Moment) => {
    const index = schedule.findIndex(g => {
      const range = getStartEndTimeISO(g)
      return currentTime.isBetween(moment.utc(range.start_time), moment.utc(range.end_time).subtract(1, 'second'))
    })

    return index
  }

export   function getSchedule(list: GameItem[]) : {day:string, list:GameItem[]}[]
{
  let map = new Map();

  list.forEach((element) => {
    const day = moment.utc(element.time).local().format('dddd')

    if(map.has(day))
      {
        let new_array = map.get(day)
        new_array.push(element)
        map.set(day, new_array)
      }
      else
      {
        map.set(day, [element])
      }
  })
  
  const sorted_list : {day:string, list:GameItem[]}[] = Array.from(map, ([day, list]) => ({day, list}))
  return sorted_list
}

export const initActiveIndex = (schedule:GameItem[], currentTime: Moment) => {
    
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
    return getActiveIndex(schedule, currentTime)
  }
}

export const scrollToGame = (index:number) => {
  const element = document.getElementById(`game-item-${index}`);
  if(element){
    element.scrollIntoView({behavior:'smooth', block: 'center', inline: 'center'})
  }
};

export const DayLabel = (props: {day:string, time:string}) => {
  return (<h2 className='
  em:[writing-mode:horizontal-lr] 
  xs:[writing-mode:vertical-lr] 
  p-2 flex justify-start  border-sky-900 border-[1px] rounded-lg flex-wrap'>
    <span className='em:hidden 3xs:block'>{props.day + " /\u00A0"}</span>
    <span>{""+moment.utc(props.time).local().format('MMMM Do')}</span>
  </h2>)
}

export const TimeInfo = (props: {time:string, className?:string}) => {

  const time= moment.utc(props.time).local().format('hh:mm A').replace(/^(?:00:)?0?/, '')
  const timeZone = moment.tz.guess()
  const timeZoneOffset = new Date(props.time).getTimezoneOffset();
  const abr = moment.tz.zone(timeZone)?.abbr(timeZoneOffset)

  return <div className={`text-nowrap inline-block ${props.className ?? ''}`}>
            <span>{time +" (" + abr + ")"}</span>
          </div>
}