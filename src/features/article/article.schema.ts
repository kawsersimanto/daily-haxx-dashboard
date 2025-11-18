import { z } from "zod";

export const ArticleSchema = z.object({
  userId: z.string().min(1, "User is required"),
  categoryId: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  coverImage: z
    .string()
    .optional()
    .refine(
      (val) => !val || z.string().url().safeParse(val).success,
      "Cover image must be a valid URL"
    ),
  body: z.string().optional(),
  companyName: z.string().min(1, "Company name is required"),
});

export type ArticleSchemaType = z.infer<typeof ArticleSchema>;
