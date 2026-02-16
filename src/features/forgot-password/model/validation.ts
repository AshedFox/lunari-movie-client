import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Enter valid email' }).trim(),
});
