'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { ReviewForm, CreateReviewInput } from '@entities/review';
import { createCollectionReviewAction } from '../api/actions';

type Props = {
  collectionId: number;
  onSuccess?: () => void;
};

export const CreateCollectionReviewForm = ({
  collectionId,
  onSuccess,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: CreateReviewInput): Promise<void> => {
    startTransition(() => {
      toast.promise(
        createCollectionReviewAction({
          mark: data.mark,
          text: data.text,
          collectionId: collectionId,
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
