import { z } from "zod";
import { Message } from "./MessageSchema";



export const SpaceSchema = z.object({
    name: z.string().regex(/^[a-z]+$/, {message:'only chrachters from a-z are allowed'}),
    image: z.string(),
    headline: z.string(),
    description: z.string(),
    isDarkTheme: z.boolean(),
    thankyouPageTitle: z.string().optional(),
    thankyouPageText: z.string().optional(),
    sticker: z.string().optional(),
});




export interface Space {
    _id:string
    name:string,
    image: string,
    headline: string,
    description: string,
    isDarkTheme: boolean,
    thankyouPageTitle:string,
    thankyouPageText:string,
    sticker:string,
    createdAt:string,
    messages:Message[]

}

