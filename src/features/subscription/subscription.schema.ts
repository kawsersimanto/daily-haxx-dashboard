import { z } from "zod";

export const subscriptionFeatureSchema = z.object({
  name: z.string().min(1, "Feature name is required"),
  description: z.string().min(1, "Feature description is required"),
});

export const subscriptionSchema = z.object({
  name: z.string().min(1, "Subscription name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative("Price must be 0 or greater"),
  currency: z.enum(["usd", "eur", "gbp"]).default("usd"),
  interval: z.enum(["month", "year"]),
  features: z
    .array(subscriptionFeatureSchema)
    .min(1, "At least one feature is required"),
});

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;
