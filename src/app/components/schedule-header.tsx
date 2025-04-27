import React, { ReactNode } from 'react'

const ScheduleHeader = (props:{children:ReactNode}) => {
    return (      
    <article className="w-full grid place-content-center em:p-0 3xs:p-8">
        <header className="font-bold flex flex-col items-center justify-center gap-8">
            <h1 className="sm:text-4xl 2xs:text-2xl 3xs:text-xl ">
                <span className='em:hidden 3xs:inline'>Burry Heights Gaming Marathon (2025)</span>
                <span className='em:inline 3xs:hidden'>BHGM 11 (2025)</span>
            </h1>
            <p className="sm:text-2xl em:text-lg">{props.children}</p>
        </header>
    </article>)
}
  
export default ScheduleHeader