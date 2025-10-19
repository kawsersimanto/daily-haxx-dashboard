import { z } from "zod";

export const PollSchema = z.object({});

export type PollSchemaType = z.infer<typeof PollSchema>;
