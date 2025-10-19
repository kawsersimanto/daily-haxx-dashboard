import { z } from "zod";

export const ImageSchema = z.object({});

export type ImageSchemaType = z.infer<typeof ImageSchema>;
