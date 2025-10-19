import { z } from "zod";

export const PollSchema = z.object({});

export const PollCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export type PollSchemaType = z.infer<typeof PollSchema>;
export type PollCategorySchemaType = z.infer<typeof PollCategorySchema>;
