'use client'
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
   const {data}=useSession();
const handleSignout=async()=>{
await signOut();
}

  return (
    <div className='flex items-center justify-center gap-6 w-screen h-screen flex-col'>

  <h1 className='font-bold text-5xl'>Hi, {data?.user.username || data?.user.name}!👋</h1>
      <h3 className='font-semibold text-3xl'>{data?.user.email}</h3>
      
      <Button onClick={handleSignout}>Signout</Button> 
    
    </div>
  )
}

export default page
