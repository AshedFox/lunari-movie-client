import { z } from 'zod';

export const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().min(1),
  NEXT_PUBLIC_STRIPE_KEY: z.string().min(1),
});

export const serverEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().min(1),
  ACCESS_COOKIE_KEY: z.string().min(1),
  REFRESH_COOKIE_KEY: z.string().min(1),
  USER_COOKIE_KEY: z.string().min(1),
  PORT: z.coerce.number().min(1),
  NEXT_PUBLIC_STRIPE_KEY: z.string().min(1),
});
