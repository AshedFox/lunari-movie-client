import { z } from 'zod';
import { passwordSchema } from '@lib/validation/password-schema';

export const signUpSchema = z
  .object({
    email: z.string().email({ message: 'Enter valid email' }).trim(),
    password: passwordSchema,
    passwordRepeat: z.string().trim(),
    name: z.string().regex(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){1,2}$/, {
      message: 'Name must be valid',
    }),
  })
  .refine(({ password, passwordRepeat }) => password === passwordRepeat, {
    message: 'Passwords must match',
    path: ['passwordRepeat'],
  });
