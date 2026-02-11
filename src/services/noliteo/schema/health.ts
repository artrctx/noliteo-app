import { z } from "zod";

const dbHealthSchema = z.object({
  status: z.string(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export const healthSchema = z.object({
  status: z.string(),
  service: z.string(),
  db: dbHealthSchema,
});

export type Health = z.infer<typeof healthSchema>;
