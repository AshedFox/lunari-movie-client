import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email({ message: 'Enter valid email' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .max(32, { message: 'Be at most 32 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .trim(),
    passwordRepeat: z.string().trim(),
    name: z.string().regex(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){1,2}$/, {
      message: 'Name must be valid',
    }),
  })
  .refine(({ password, passwordRepeat }) => password === passwordRepeat, {
    message: 'Passwords must match',
    path: ['passwordRepeat'],
  });
