import { Resend } from "resend";
import VerificationEmail from "../../Emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail (name: string, email: string, verifyCode: string):Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Testimonial <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your account",
      react: VerificationEmail({ name, verifyCode }),
    });
    return { success: true, message: "Verification code sent successfully" };
  } catch (error) {
    console.log('error sending verification code',error);
    return { success: false, message: "Failed to send verification code" };
  }
};
