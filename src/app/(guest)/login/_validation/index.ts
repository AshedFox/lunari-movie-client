import { z } from 'zod';
import { LoginInput } from '@lib/graphql/generated/graphql';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Enter valid email' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .max(32, { message: 'Be at most 32 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .trim(),
}) satisfies z.ZodSchema<LoginInput>;
