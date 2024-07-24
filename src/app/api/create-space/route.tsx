import { dbConnect } from "@/lib/dbconnect";
import { SpaceModel } from "@/model/Space";
import UserModel from "@/model/User";

export async function POST(request:Request) {
    dbConnect();
   try {
     const {email, name, image, headline, description, isDarkTheme, thankyouPageTitle,thankyouPageText,sticker }=await request.json();
     if(!email || ! name ||  !image ||  !headline ||  !description ||  !isDarkTheme ||  !thankyouPageTitle || !thankyouPageText || !sticker ){
        return Response.json(
            {
              success: false,
              message: 'All the firlds are required',
            },
            { status: 400 }
          );
     }

     const user=await UserModel.findOne({email})
     if(!user){
        return Response.json(
            {
              success: false,
              message: 'User not found',
            },
            { status: 400 }
          );
     }

     const spaceAlreadyExists = await SpaceModel.findOne({ name });
     if(spaceAlreadyExists){
        return Response.json(
            {
              success: false,
              message: 'Space with this namealready exists',
            },
            { status: 403 }
          );
     }

const newSpace=await SpaceModel.create({
    name,
    image,
    headline,
    description,
    isDarkTheme,
    thankyouPageTitle,
    thankyouPageText,
    sticker,
    owner:user._id
})


const space=await newSpace.save();

user.spaces.push(space._id)
await user.save();
 return Response.json({
    success:true,
    message:'space created successfully'
 },{status:200})


   } catch (error) {
    console.error('Error in creating space', error);
    return Response.json(
      {
        success: false,
        message: 'Error in creating space',
      },
      { status: 500 }
    );
   }
}


// name: "" || 
//             image: "" || 
//             headline: "" || 
//             description: "" || 
//             isDarkTheme: true || 
//             thankyouPageTitle: "Thankyou" || 
//             thankyouPageText: "Your feedback means a lot to us" || 
//             sticker: