'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { z } from 'zod';
import axios from 'axios';
import { Loader} from 'lucide-react';
import { otpSchema } from '@/schemas/otpSchema';
import { useParams,useRouter } from 'next/navigation';

const page = () => {

const [loading, setLoading]=useState(false);

const form = useForm<z.infer<typeof otpSchema>>({
  resolver: zodResolver(otpSchema),
  defaultValues: {
  verifyCode: "",
  },
})

const params=useParams();
const router=useRouter();
async function onSubmit(data: z.infer<typeof otpSchema>) {
setLoading(true)
try {
const response=await axios.post('/api/verify',{
  username:params.username,
  code:data.verifyCode
});
  router.replace('/sign-in')
toast({
    title: "success",
    description: response.data.message,
  })

} catch (error:any) {
console.log(error)
toast({
  title:'Error',
  description:error.response.data.message,
  variant:'destructive'
})
} finally {
setLoading(false)
}
  
}


  return (
    <div className='flex bg-[#030816] h-screen w-screen justify-center items-center'>
      <div className='p-6 mx-4 border border-slate-700 rounded-xl bg-[#030816] flex flex-col gap-6 items-center'>
    <h3 className='text-white text-2xl font-medium'>Please enter the verification code</h3>

    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>

        <FormField
          control={form.control}
          name="verifyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>Enter OTP</FormLabel>
              <FormControl>
                <Input placeholder="OTP" {...field} className='bg-transparent text-white'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


          <Button type="submit" className='my-2 bg-white text-[#030816] hover:bg-slate-300 font-semibold' disabled={loading}>{loading?<>
          <Loader className='animate-spin'/><span className='px-2'> Loading</span>
          </>  : 'Verify'}
          </Button>
        </form>
        </Form>
</div>
    </div>
  )
}

export default page
