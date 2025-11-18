import { z } from "zod";

export const PollCategorySchema = z.object({});

export type PollCategorySchemaType = z.infer<typeof PollCategorySchema>;
