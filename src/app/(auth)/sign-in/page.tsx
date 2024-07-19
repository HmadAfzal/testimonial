import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SiGoogle, SiGithub  } from "react-icons/si";
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';


const page = () => {
  return (
    <div className='flex bg-[#030816] h-screen w-screen justify-center items-center'>
        <div className='p-6 mx-4 border border-slate-700 rounded-xl bg-[#030816] '>
          <div className='flex flex-col gap-2 mb-4'>
            <h3 className='text-white text-3xl font-semibold'>Login</h3>
            <p className='text-slate-400 font-medium text-sm'>Enter your email below to Login</p>
          </div>
          <div className='flex flex-row gap-6'>
          <Button  className=' bg-transparent border border-slate-700 w-full flex flex-row gap-2'><SiGithub className='md:text-xl'/><p>GitHub</p></Button>
            <Button  className=' bg-transparent border border-slate-700 w-full flex flex-row gap-2'><SiGoogle className='md:text-xl'/><p>Google</p></Button>
          </div>
          <div className='flex flex-row items-center gap-3 justify-center my-4'>
            <Separator className='w-20'/><p className=' text-nowrap text-slate-400 text-xs font-semibold'>OR CONTINUE WITH</p><Separator className='w-20'/>
          </div>
          <form action="" className='flex flex-col gap-2'>
            <div>
            <label htmlFor='name' className='text-white font-semibold'>Email</label>
            <Input id='name' type='email' placeholder='m@email.com' className='border text-white border-slate-500 bg-transparent my-1'/>
            </div>
            <div>
            <label htmlFor='password' className='text-white font-semibold'>Password</label>
            <Input id='password' type='password' className='border text-white border-slate-500 bg-transparent my-1'/>
            </div>
            <Button type="submit" className='my-2 bg-white text-[#030816] hover:bg-slate-300 font-bold'>Login</Button>
          </form>
          <p className='text-center mt-1 text-slate-400 text-sm font-medium'>Don't have an account?<Link href={"/sign-up"} className='px-1 text-slate-200 font-semibold hover:underline'>SignUp !</Link></p>
        </div>
  
    </div>
  )
}

export default page
