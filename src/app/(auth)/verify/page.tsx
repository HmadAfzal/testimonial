import React from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
  
const page = () => {
  return (
    <div className='flex bg-[#030816] h-screen w-screen justify-center items-center'>
      <div className='p-6 mx-4 border border-slate-700 rounded-xl bg-[#030816] flex flex-col gap-6 items-center'>
    <h3 className='text-white text-2xl font-medium'>Please enter the verification code</h3>
<p className='text-slate-400 font-medium text-sm'>send to {"hm*******98@gmail.com"}</p>
      <InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator className='text-white' />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
<Button type="submit" className=' my-2 w-32 bg-white text-[#030816] hover:bg-slate-300 font-bold'>Submit</Button>
<p className='text-center mt-1 text-slate-400 text-sm font-medium'>Did't get code?<Link href={"/sign-up"} className='px-1 text-slate-200 font-semibold hover:underline'>Resend !</Link></p>
</div>
    </div>
  )
}

export default page
