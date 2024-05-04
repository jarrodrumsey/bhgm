import React from 'react'

const Footer = () => {
    return <div className="w-full h-16 p-2 bg-sky-950 flex flex-col justify-center items-center">
      <p className='text-xs'>© {new Date().getFullYear()} Jarrod Rumsey | All rights reserved</p>
    </div>
}

export default Footer