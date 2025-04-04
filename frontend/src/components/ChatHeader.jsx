import React from 'react'
import {X} from "lucide-react"
import {useAuthStore} from "../store/useAuthStore"
import { useChatStore } from '../store/useChatStore'

function ChatHeader() {
    const {selectedUser, setSelectedUser} = useChatStore()
    const {onlineUsers} = useAuthStore()
    // const onlineUsers =[]
  return (
    <div className='p-2.5 border-b border-blue-300'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center  gap-3'>

                <div className='avatar'>
                    <div className='size-10 rounded-full relative'>
                        <img src={selectedUser.profilePic || "https://thumbs.dreamstime.com/b/default-avatar-pro…ctor-social-media-user-icon-potrait-182347582.jpg"} alt={selectedUser.fullName} />
                    </div>
                </div>

                <div>
                    <h3 className='font-medium'>{selectedUser.fullName}</h3>
                    <p className='text-sm text-base-content/70'>
                    {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                    </p>
                </div>
            </div>

            <button onClick={()=>setSelectedUser(null)}>
                <X/>
            </button>
        </div>
    </div>
  )
}

export default ChatHeader