'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SiGoogle, SiGithub } from 'react-icons/si';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { z } from 'zod';
import { Loader } from 'lucide-react';
import { signinSchema } from '@/schemas/SigninSchema';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    setLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setLoading(false);
    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  const handleGithubSignin = async () => {
    setLoading(true);
    const result = await signIn('github', { redirect: false });
    setLoading(false);
    if (result?.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } 
  };
  
  const handleGoogleSignin = async () => {
    setLoading(true);
    const result = await signIn('google', { redirect: false });
    setLoading(false);
    if (result?.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex bg-[#030816] h-screen w-screen justify-center items-center'>
      <div className='p-6 mx-4 border border-slate-700 rounded-xl bg-[#030816]'>
        <div className='flex flex-col gap-2 mb-4'>
          <h3 className='text-white text-3xl font-semibold'>Login</h3>
          <p className='text-slate-400 font-medium text-sm'>Enter your email below to Login</p>
        </div>

  

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} className='bg-transparent text-white' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} className='bg-transparent text-white' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='my-2 bg-white text-[#030816] hover:bg-slate-300 font-semibold' disabled={loading}>
              {loading ? (
                <>
                  <Loader className='animate-spin' />
                  <span className='px-2'> Loading</span>
                </>
              ) : 'Login'}
            </Button>
          </form>
        </Form>
        <div className='flex flex-row items-center gap-3 justify-center my-4'>
          <Separator className='w-20' />
          <p className='text-nowrap text-slate-400 text-xs font-semibold'>OR CONTINUE WITH</p>
          <Separator className='w-20' />
        </div>
        <div className='flex flex-row gap-6 pb-4'>
          <Button className='bg-transparent border border-slate-700 w-full flex flex-row gap-2' onClick={handleGithubSignin}>
            <SiGithub className='md:text-xl' />
            <p>GitHub</p>
          </Button>
          <Button className='bg-transparent border border-slate-700 w-full flex flex-row gap-2' onClick={handleGoogleSignin}>
            <SiGoogle className='md:text-xl' />
            <p>Google</p>
          </Button>
        </div>
        <p className='text-center mt-1 text-slate-400 text-sm font-medium'>Don't have an account?
          <Link href={"/sign-up"} className='px-1 text-slate-200 font-semibold hover:underline'>SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default page;
