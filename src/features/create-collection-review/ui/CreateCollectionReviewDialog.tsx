'use client';

import { useState } from 'react';
import { CreateCollectionReviewForm } from './CreateCollectionReviewForm';
import { ReviewDialog } from '@entities/review';

type Props = {
  collectionId: number;
};

export const CreateCollectionReviewDialog = ({ collectionId }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <ReviewDialog open={open} onOpenChange={setOpen} title="Write a review">
      <CreateCollectionReviewForm
        collectionId={collectionId}
        onSuccess={() => setOpen(false)}
      />
    </ReviewDialog>
  );
};
