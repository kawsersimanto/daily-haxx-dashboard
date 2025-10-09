import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  companyName: z.string().min(1),
  jobTitle: z.string().min(1),
  jobFunction: z.string().min(1),
  country: z.string().min(1),
  jobLevel: z.string().min(1),
  companyIndustry: z.string().min(1),
  companySize: z.string().min(1),
  postalCode: z.string().min(1),
  phone: z.string().min(1),
});

export type UserSchemaType = z.infer<typeof userSchema>;
