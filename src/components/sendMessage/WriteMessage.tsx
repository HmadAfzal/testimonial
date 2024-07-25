"use client"
import * as React from "react"
import { useState } from "react";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { MessageSchema } from "@/schemas/MessageSchema";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea"

const WriteMessage = ({ setSendMessage, spaceData }: { setSendMessage: any, spaceData:any }) => {
    const [loading, setLoading] = useState(false);
    const {data}=useSession();
    const form = useForm<z.infer<typeof MessageSchema>>({
        resolver: zodResolver(MessageSchema),
        defaultValues: {
            feedback: "",
            name: "",
            email: "",
            image: "",
        }
           
    })

   async function onSubmit(data: z.infer<typeof MessageSchema>) {
       setLoading(true)
       try {
        const response = await axios.post('/api/send-message',{
            feedback:data.feedback,
            name:data.name,
            email:data.email,
            image:data.image,
            spaceId:spaceData._id
        })

        toast({
            title:'Success',
            description:response?.data.message
        })
        form.reset({
            name: '',
            feedback: '',
            email: '',
            image: ''
          })

       } catch (error: any) {
        console.log(error)
        toast({
            title:'Error',
            description:error.response?.data.message
        })
       } finally{
        setLoading(false)
       }
       
    }

    return (
        <div className={`flex items-center justify-center min-h-screen bg-black`}>
            <Card className="w-[550px]">
                <CardHeader>
                    <CardTitle>Send Message</CardTitle>
                    <CardDescription>Write a clear message</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name" {...field} className='bg-transparent' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="xyz@gmail.com" {...field} className='bg-transparent' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>image url</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Image" {...field} className='bg-transparent' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                                                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                            <FormField
                                control={form.control}
                                name="feedback"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Message" {...field} className='bg-transparent' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-between">
                                <Button variant="outline" onClick={() => setSendMessage(false)}>Cancel</Button>
                                <Button type="submit" disabled={loading}>{loading ? 'sending' : 'send'}</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default WriteMessage
