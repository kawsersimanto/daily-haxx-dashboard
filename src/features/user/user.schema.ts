import { z } from "zod";

export const UserSchema = z.object({});

export type UserSchemaType = z.infer<typeof UserSchema>;
