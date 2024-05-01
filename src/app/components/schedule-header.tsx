import React, { ReactNode } from 'react'

const ScheduleHeader = (props:{children:ReactNode}) => {
    return (      
    <article className="w-full grid place-content-center p-8">
        <header className="font-bold flex flex-col items-center justify-center gap-8">
        <h1 className="sm:text-4xl em:text-2xl">Burry Heights Gaming Marathon X (2024)</h1>
        <p className="sm:text-2xl em:text-lg">{props.children}</p>
        </header>
    </article>)
}
  
export default ScheduleHeader