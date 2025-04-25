import React from 'react'
import { MessageSquare } from "lucide-react"
import chat from "../assets/chat.svg"
function NoChatSelected() {
  return (
    <div className='w-full flex items-center justify-center  bg-base-100/50'>
      <div className=' w-full h-full text-center'>

        <div className='flex flex-col pt-10 items-center justify-center h-full px-10 sm:px-24 gap-6'>
          <div className=' items-center w-full h-full md:w-1/2 justify-center flex'>
            <img src={chat} className='' alt='login img' />
          </div>
          <div className=' w-full h-full'>
            <div>
              <h2 className='text-2xl font-bold'>Welcome to Chitchat!</h2>
              <p className='text-base-content/60'>
                Select a conversion from the sidebar to start chatting</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default NoChatSelected