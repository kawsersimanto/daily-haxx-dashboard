import { z } from "zod";
import { CurrencyEnum, IntervalEnum } from "./subscription.interface";

const currencyEnum = z.enum(Object.values(CurrencyEnum), {
  error: () => ({ message: "Please select a valid currency" }),
});

const intervalEnum = z.enum(Object.values(IntervalEnum), {
  error: () => ({ message: "Please select a valid interval" }),
});

export const SubscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price is required"),
  currency: currencyEnum,
  interval: intervalEnum,
  features: z
    .array(
      z.object({
        name: z.string().min(1, "Feature name is required"),
        description: z.string().min(1, "Feature description is required"),
      })
    )
    .min(1, "At least one feature is required"),
});

export type SubscriptionSchemaType = z.infer<typeof SubscriptionSchema>;
