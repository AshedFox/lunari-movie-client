import { z } from 'zod';

export const collectionReviewSchema = z.object({
  text: z.string().min(1).max(5000).trim(),
  mark: z.coerce.number().int().min(1).max(10),
});
