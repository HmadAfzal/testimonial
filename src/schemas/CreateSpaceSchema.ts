import { z } from "zod";



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


