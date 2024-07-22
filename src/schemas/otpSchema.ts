import { z } from 'zod';

export const otpSchema = z.object({
  verifyCode: z.string()
    .regex(/^[0-9]+$/, { message: 'OTP only consists of numbers' })
    .length(6, { message: 'OTP must be exactly 6 characters long' }) // Use .length for exact length requirement
});
