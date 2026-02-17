'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { ReviewForm, CreateReviewInput } from '@entities/review';
import { createMovieReviewAction } from '../api/actions';

type Props = {
  movieId: string;
  onSuccess?: () => void;
};

export const CreateMovieReviewForm = ({ movieId, onSuccess }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: CreateReviewInput): Promise<void> => {
    startTransition(() => {
      toast.promise(
        createMovieReviewAction({
          mark: data.mark,
          text: data.text,
          movieId: movieId,
        }),
        {
          loading: 'Creating review...',
          success: () => {
            onSuccess?.();
            return 'Review created successfully';
          },
          error: 'Failed to create review',
        },
      );
    });
  };

  return <ReviewForm onSubmit={onSubmit} isSubmitting={isPending} />;
};
