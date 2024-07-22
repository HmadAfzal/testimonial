import  {z} from 'zod'

export const signupSchema=z.object({
    username:z.string().min(4,{message:'Name must be atleast 4 chrachters'}),
    email:z.string().email({message:'Invalid email address'}),
    password:z.string().min(6,{message:'Password must be atleast 6 chrachters'})
})


export type signup = {
    username:string,
    email:string,
    password:string
}



