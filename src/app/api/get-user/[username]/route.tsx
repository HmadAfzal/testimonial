import { dbConnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/User";

export async function GET(request:Request) {
    await dbConnect();
    try {
        const session=await getServerSession(authOptions);
    if(!session){
        return Response.json({success:false, message:"unauthorzed - please login again"},{status:400})
    }


const user=await UserModel.findOne({email:session.user.email}).select('-password -verifyCode -verifyCodeExpiry -updatedAt -isVerified').populate({
    path: 'spaces',
    select: '-updatedAt -owner'
  }).lean();
if(!user){
    return Response.json({success:false, message:"unauthorzed - user not found"},{status:404})

}
return  Response.json(user)

    } catch (error) {
        console.log(error)
        return Response.json({success:false, message:"Error fetching user"},{status:500})

    }
}