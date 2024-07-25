import { dbConnect } from "@/lib/dbconnect";
import { Message, SpaceModel } from "@/model/Space";

export async function POST(request:Request) {
    await dbConnect();
    try {
    const {feedback, name, email, image, spaceId}=await request.json();
    console.log(spaceId)
    if(!feedback || !name){
        return Response.json({success:false, message:"message and name is required"},{status:400}) 
    }
    const space=await SpaceModel.findOne({_id:spaceId})
    if(!space){
        return Response.json({success:false, message:"space not found"},{status:400}) 
    }
   const newMessage={
    feedback,
    name,
    email,
    image
   }

   space.messages.push(newMessage as Message);
   await space.save();
   return Response.json({success:true, message:"Message sent successfully"},{status:200}) 

    } catch (error) {
        console.log(error)
        return Response.json({success:false, message:"Error sending message"},{status:500})

    }
}