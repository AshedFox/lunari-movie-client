import { z } from 'zod';
import { passwordSchema } from '@shared/lib/zod/password-schema';
import { LoginInput } from '@shared/api/graphql/graphql';

export const loginSchema = z.object({
  email: z.email({ message: 'Enter valid email' }).trim(),
  password: passwordSchema,
}) satisfies z.ZodSchema<LoginInput>;
