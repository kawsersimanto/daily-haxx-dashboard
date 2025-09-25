import { z } from "zod";

export const DashboardSchema = z.object({
  // Example field
  title: z.string().min(1, "Title is required"),
});

export type DashboardSchemaType = z.infer<typeof DashboardSchema>;
