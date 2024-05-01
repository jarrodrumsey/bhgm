import Link from 'next/link'
import React from 'react'

const NavLink = (props: {href:string, title:string}) => {
    return(
        <Link href={props.href} 
        className=" p-2 rounded-md 
        border-[1px] border-sky-400 
        bg-gradient-to-tr from-blue-500 bg-sky-900 text-nowrap capitalize">
        {props.title}
        </Link>
    )
}

export default NavLink