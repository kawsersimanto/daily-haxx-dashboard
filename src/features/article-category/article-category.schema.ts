import z from "zod";

export const ArticleCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export type ArticleCategorySchemaType = z.infer<typeof ArticleCategorySchema>;
