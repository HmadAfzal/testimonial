import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Pen } from 'lucide-react'
const Spaceinfo = ({ setSendMessage, spaceData }: { setSendMessage: any, spaceData:any }) => {
  return (
    <div>
       <div className={`bg-black h-screen w-screen text-white flex flex-col gap-16 items-center justify-center ${spaceData.isDarkTheme ? 'bg-black' : 'bg-white'}}`}>
            <Avatar className='h-40 w-40'>
                <AvatarImage src={spaceData?.image} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className='font-bold text-7xl text-center w-[60%]'>{spaceData?.headline}</h1>
            <p className='w-[60%] text-center font-lg '>{spaceData?.description}</p>
<Button className='flex items-center gap-4' onClick={()=>setSendMessage(true)}><Pen className='h-5'/> Write a Feedback</Button>
        </div>
    </div>
  )
}

export default Spaceinfo
