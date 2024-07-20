import { sendVerificationEmail } from "@/helpers/SendVerificationEmail";
import { dbConnect } from "@/lib/dbconnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return Response.json(
        { success: false, message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const existingUserByEmail = await UserModel.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          { success: false, message: "User with this email already exists" },
          { status: 400 }
        );
      } else {
        existingUserByEmail.name = name,
          existingUserByEmail.password = hashedPassword,
          existingUserByEmail.verifyCode = verifyCode,
          existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
      });
      await newUser.save();
    }

  const emailResponse=await sendVerificationEmail(name,email,verifyCode);
  if(!emailResponse.success){
    return Response.json(
        {
          success: false,
          message:emailResponse.message,
        },
        { status: 500 }
      );
  }else{
     return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  }

  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}

