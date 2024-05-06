import React from 'react'

const Footer = () => {
    return <div className="w-full h-16 p-2 bg-sky-950 flex flex-col gap-1 justify-center items-center text-xs">
      <p className=''>© {new Date().getFullYear()} Jarrod Rumsey | All rights reserved</p>
      <div className='flex gap-2'>
        <a className='underline' href='https://jarrodrumsey.ca/' target='_blank'>Website</a>
        <a className='underline' href='https://github.com/jarrodrumsey' target='_blank'>GitHub</a>
        <a className='underline' href='https://linkedin.com/in/jarrodrumsey' target='_blank'>LinkedIn</a>
      </div>
    </div>
}

export default Footer