import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, { message: 'Be at least 8 characters long' })
  .max(32, { message: 'Be at most 32 characters long' })
  .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
  .regex(/[0-9]/, { message: 'Contain at least one number.' })
  .trim();
