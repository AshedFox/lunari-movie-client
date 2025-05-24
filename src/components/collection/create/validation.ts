import { z } from 'zod';

export const createCollectionSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(4095).optional(),
  cover: z
    .object({
      id: z.string().uuid(),
      url: z.string(),
    })
    .optional(),
  movies: z
    .array(z.object({ label: z.string(), value: z.string().uuid() }))
    .min(1),
});
