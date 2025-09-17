import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().default(200),
  LOG_LEVEL: z.string().default('info')
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  // show readable errors
  console.error('Invalid environment variables:', parsed.error.format());
  process.exit(1);
}
export const config = parsed.data;
