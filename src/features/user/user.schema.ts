import { IRole } from "@/features/user/user.interface";
import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobFunction: z.string().min(1, "Job function is required"),
  country: z.string().min(1, "Country is required"),
  jobLevel: z.string().min(1, "Job level is required"),
  companyIndustry: z.string().min(1, "Company industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  phone: z.string().min(1, "Phone number is required"),
  role: z.enum(Object.values(IRole)),
  isActive: z.boolean(),
});

export type UserSchemaType = z.infer<typeof userSchema>;
