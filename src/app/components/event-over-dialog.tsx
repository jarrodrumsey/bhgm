import { Dispatch, SetStateAction } from "react"
import { XMarkIcon } from "./icons/xmark"
import TwitchStream from "./twitch-stream"
import { TwitchIcon } from "./icons/twitch"
import { YoutubeIcon } from "./icons/youtube"

export const EventOverDialog = (props: {setShowVideo: Dispatch<SetStateAction<boolean>>}) => {
    return (
    <div className="absolute h-full w-full top-0 left-0 z-[160]"> 
      <div className="fixed top-0 left-0 h-screen rounded-md self-start flex justify-center items-center w-full bg-slate-600/60 backdrop-blur-[2px]">
          <div className=" w-[50rem] bg-stone-800 p-7 rounded-lg flex flex-col gap-2">
              <div className="flex flex-col gap-4 mb-4 pb-4 border-b border-stone-700">
                <div className="flex flex-row justify-between">
                    <h2 className="text-xl w-full font-bold">Burry Heights Gaming Maraton - 2024</h2>
                    <button onClick={() => props.setShowVideo(show => !show)}><XMarkIcon width={24}/></button> 
                </div>
                <p >The marathon is now over. Go check us out on social media for highlights!</p> 
              </div>
              <div className="links flex flex-col gap-4">
                <h3 className="font-semibold">Social Media</h3>
                <div className="w-full h-full grid em:grid-cols-1 em:grid-rows-2 xs:grid-rows-1 xs:grid-cols-2 gap-8 place-items-center place-content-center font-medium">
                    <a className="hover:bg-stone-700 transition-all ease-in-out p-3 rounded-md flex justify-center items-center gap-4 w-full" href="https://twitch.com/burryheightsgaming" target="_blank">
                        <TwitchIcon width={24}/>
                        Twitch
                    </a>
                    <a className="hover:bg-stone-700 transition-all ease-in-out p-3 rounded-md flex justify-center items-center gap-4 w-full" href="https://www.youtube.com/channel/UCnIsblyGTSNhHi669HrZjjw" target="_blank">
                        <YoutubeIcon width={24}/>
                        Youtube
                    </a>
                </div> 
              </div>
              
              <TwitchStream channel={"burryheightsgaming"} width={800} height={600} />
          </div>
      </div>
    </div>
    )
  }
  