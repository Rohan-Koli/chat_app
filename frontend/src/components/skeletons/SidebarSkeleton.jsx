import React from 'react'
import {Users} from "lucide-react"
function SidebarSkeleton() {
    const skeletonContacts = Array(8).fill(null)
  return (
    <div className=' h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
        <div className='border-b border-base-300 w-full p-5'>
            <div className='flex items-center gap-2'>
                <Users className='siz-6' />
                <span className='font-medium hidden lg:block'>Contacts</span>
            </div>
        </div>
    </div>
  )
}

export default SidebarSkeleton