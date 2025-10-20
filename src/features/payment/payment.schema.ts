import { z } from "zod";

export const PaymentSchema = z.object({});

export type PaymentSchemaType = z.infer<typeof PaymentSchema>;
