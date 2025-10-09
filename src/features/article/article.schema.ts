import { z } from "zod";

export const ArticleSchema = z.object({});

export const ArticleCategorySchema = z.object({
  name: z.string().min(1).min(1),
});

export type ArticleSchemaType = z.infer<typeof ArticleSchema>;
export type ArticleCategorySchemaType = z.infer<typeof ArticleCategorySchema>;
