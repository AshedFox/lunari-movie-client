import { z } from 'zod';

export const editCollectionSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(4095).optional(),
  cover: z
    .object({
      id: z.string().uuid(),
      url: z.string(),
    })
    .optional(),
});
