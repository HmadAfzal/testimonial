'use client'

import { Separator } from '@/components/ui/separator'
import { useAppSelector } from '@/redux/hooks'
import { selectUser } from '@/redux/UserSlice'
import { Link2 } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Page = () => {
  const user = useAppSelector(selectUser)
  const params = useParams()
  const space = user?.spaces.filter((space) => space.name === params.spacename)

  return (
    <div className='flex bg-[#030816] text-white min-h-screen max-w-screen py-20 justify-center'>
      <div className='w-[80%]'>
        {space?.map((space) => (
          <div key={space._id}>
            <div className='flex items-center gap-6'>
            <Avatar className='h-20 w-20'>
                <AvatarImage src={space.image} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
            <h1 className='text-4xl font-bold pb-4'>{space.name} Space</h1>
            <Link href={`http://localhost:3000/u/${space.name}`} className='text-neutral-600 flex gap-2'>
              <Link2 />
              {`url: http://localhost:3000/u/${space.name}`}
            </Link></div></div>
            <Separator className='my-4' />
          
            <h1 className='text-4xl font-bold pb-4'>Messages</h1>
            <div className='grid grid-cols-3 gap-4'>
              {space.messages.map((message, index) => (
                <div key={index} className='w-80 cursor-pointer hover:scale-95 transition-transform'>
                  <Card>
                    <CardHeader>
                      <CardTitle>{message.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{message.feedback}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
