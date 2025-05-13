import { z } from 'zod';

export const filterSchema = z.object({
  name: z.string().catch(''),
  createdAtFrom: z.string().datetime().catch(''),
  createdAtTo: z.string().datetime().catch(''),
  updatedAtFrom: z.string().datetime().catch(''),
  updatedAtTo: z.string().datetime().catch(''),
  isSystem: z
    .enum(['true', 'false'])
    .transform((value) => (value !== undefined ? value === 'true' : undefined))
    .catch(undefined),
});
