import React, { ReactNode } from 'react'

interface NavButtonListProps {
    children:ReactNode
}

const NavButtonList: React.FC<NavButtonListProps> = ({children}) => {
  return (
    <div className='m-5 w-min text-sm flex flex-col gap-2'>
        {children}
    </div>
  )
}

export default NavButtonList