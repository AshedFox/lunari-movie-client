import { z } from 'zod';

export const createReviewSchema = z.object({
  text: z.string().min(10, {
    message: 'Review must be at least 10 characters long',
  }),
  mark: z
    .number()
    .min(1, { message: 'Rating must be at least 1' })
    .max(10, { message: 'Rating must be at most 10' }),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
