import { z } from 'zod';
import { LoginInput } from '@lib/graphql/generated/graphql';
import { passwordSchema } from '@lib/validation/password-schema';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Enter valid email' }).trim(),
  password: passwordSchema,
}) satisfies z.ZodSchema<LoginInput>;
