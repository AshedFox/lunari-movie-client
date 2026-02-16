import { z } from 'zod';
import { passwordSchema } from '@shared/lib/zod/password-schema';

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
});
