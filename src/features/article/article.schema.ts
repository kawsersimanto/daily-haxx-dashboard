import { z } from "zod";

export const ArticleSchema = z.object({});

export type ArticleSchemaType = z.infer<typeof ArticleSchema>;
