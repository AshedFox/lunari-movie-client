import { z } from 'zod';

export const collectionFilterSchema = z.object({
  name: z.string().catch(''),
  createdAtFrom: z.iso.datetime().catch(''),
  createdAtTo: z.iso.datetime().catch(''),
  updatedAtFrom: z.iso.datetime().catch(''),
  updatedAtTo: z.iso.datetime().catch(''),
  isSystem: z
    .enum(['true', 'false'])
    .transform((value) => (value !== undefined ? value === 'true' : undefined))
    .catch(undefined),
});
