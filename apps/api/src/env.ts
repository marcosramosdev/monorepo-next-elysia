import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url().startsWith("postgresql://"),
  BUILD_TARGET: z.string().optional(),
});

export const env = envSchema.parse(Bun.env);
