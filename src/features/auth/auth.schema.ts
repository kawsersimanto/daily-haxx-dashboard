import { z } from "zod";

export const authSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .refine((val) => /^\d+$/.test(val), {
      message: "OTP must contain only numbers",
    }),
});

export const emailSchema = authSchema.pick({
  email: true,
});

export const otpSchema = authSchema.pick({
  otp: true,
});

export type OtpFormValues = z.infer<typeof otpSchema>;
export type AuthFormValues = z.infer<typeof authSchema>;
export type EmailFormValues = z.infer<typeof emailSchema>;
