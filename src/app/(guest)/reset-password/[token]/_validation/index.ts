import { z } from 'zod';
import { passwordSchema } from '@lib/validation/password-schema';

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
});
