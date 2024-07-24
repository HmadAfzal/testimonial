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
import { SpaceSchema } from "@/schemas/SpaceSchema"
import { Moon } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import axios from "axios";
import { useSession } from "next-auth/react";

const Createspace = ({ setCreateSpace }: { setCreateSpace: any }) => {
    const [loading, setLoading] = useState(false);
    const [additional, setAdditional] = useState(false);
    const {data}=useSession();
    const form = useForm<z.infer<typeof SpaceSchema>>({
        resolver: zodResolver(SpaceSchema),
        defaultValues: {
            name: "",
            image: "",
            headline: "",
            description: "",
            isDarkTheme: true,
            thankyouPageTitle: "Thankyou",
            thankyouPageText: "Your feedback means a lot to us",
            sticker: 'https://media.giphy.com/media/8qD1FHjc4wllVBL3ln/giphy.gif?cid=ecf05e47gvya2nlu06oll65e05mxeg23paqfdhwynqmzbbyf&ep=v1_gifs_search&rid=giphy.gif&ct=g'
        },
    })

   async function onSubmit(spacedata: z.infer<typeof SpaceSchema>) {
        setLoading(true)
        try { 
            const response = await axios.post('/api/create-space', {
                email:data.user.email,
                name: spacedata.name,
                image: spacedata.image,
                headline: spacedata.headline,
                description: spacedata.description,
                isDarkTheme: spacedata.isDarkTheme,
                thankyouPageTitle: spacedata.thankyouPageTitle,
                thankyouPageText:spacedata.thankyouPageText,
                sticker:spacedata.sticker
            })
            console.log(response);
            setCreateSpace(false)
            toast({
                title:'success',
                description:response.data.message
            })
        } catch (error:any) {
            console.log(error)
            toast({
                title:'error',
                description:error.response.data.message,
                variant:'destructive'
            })
        } finally{
            setLoading(false)
        }
       
    }

    return (
        <div className={`flex items-center justify-center min-h-screen ${additional && 'h-[120vh]'}`}>
            <Card className="w-[550px]">
                <CardHeader>
                    <CardTitle>Create Space</CardTitle>
                    <CardDescription>Deploy your new space in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Space Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} className='bg-transparent' />
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
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Image URL" {...field} className='bg-transparent' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="headline"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Headline</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Would you like to give a shoutout to xyz" {...field} className='bg-transparent' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Give us a shoutout pls" {...field} className='bg-transparent' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div onClick={() => setAdditional(!additional)}>
                                <p className="text-sm font-medium leading-none py-2 text-blue-700 cursor-pointer hover:underline">
                                    Additional Settings
                                </p>
                            </div>

                            {additional && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="isDarkTheme"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Dark Mode</FormLabel>
                                                <div className="flex items-center space-x-4 rounded-md border p-4">
                                                    <Moon />
                                                    <div className="flex-1 space-y-1">
                                                        <p className="text-sm font-medium leading-none">
                                                            Dark Mode
                                                        </p>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={(checked) => field.onChange(checked)}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="thankyouPageTitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title for Thank You Page</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Thank you" {...field} className='bg-transparent' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="thankyouPageText"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Additional Text</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your feedback means a lot to us" {...field} className='bg-transparent' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="sticker"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Picture for Thank You Page</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Image URL" {...field} className='bg-transparent' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}

                            <div className="flex items-center justify-between">
                                <Button variant="outline" onClick={() => setCreateSpace(false)}>Cancel</Button>
                                <Button type="submit" disabled={loading}>{loading ? 'Creating Space' : 'Create Space'}</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Createspace
