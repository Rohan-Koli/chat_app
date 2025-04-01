import React, { useEffect, useRef } from 'react'
import {useChatStore} from "../store/useChatStore"
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import {formatMessageTime} from "../lib/utils.js"
function ChatContainer() {
  const {messages,getMessages,isMessageLoading,selectedUser,subscribeToMessages,unsubscribeToMessages} = useChatStore()
  const {authUser} = useAuthStore()
  const messageEndRef = useRef(null)
  useEffect(()=>{
    getMessages(selectedUser._id)
    subscribeToMessages();
    return () =>unsubscribeToMessages()
  },[selectedUser._id,getMessages,subscribeToMessages,unsubscribeToMessages])

  useEffect(()=>{
    // subscribeToMessages();
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[messages])

  if(isMessageLoading) return (
    <>
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
    </>
  )
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <div className='flex-1 overflow-auto p-4 space-y-4'>
      {messages.map((message,index)=>(
        <div key={index} className={`chat ${message.senderId=== authUser._id ? "chat-end" :"chat-start"}`}
        ref={messageEndRef}
        >
         
          <div className='chat-image avatar'>
    
            <div className='size-10 rounded-full border'>
              <img src={message.senderId ==authUser._id 
                ? authUser.profilePic || "https://thumbs.dreamstime.com/b/default-avatar-pro…ctor-social-media-user-icon-potrait-182347582.jpg"
                : selectedUser.profilePic || "https://thumbs.dreamstime.com/b/default-avatar-pro…ctor-social-media-user-icon-potrait-182347582.jpg"} alt="profile pic" />
            </div>
          </div>
          <div className=' chat-header mb-1'>
            <time className='text-xs opacity-50 ml-1'>
              {formatMessageTime(message.createdAt)}
            </time>
          </div>
          <div className='chat-bubble flex flex-col'>
            {message.image && (
              <img src={message.image} alt="Attachment" className='sm:max-[200px] rounded-md mb-2' />
            )}
            {message.text && <p>{message.text}</p>}
          </div>
        </div>
        
      ))}

      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer