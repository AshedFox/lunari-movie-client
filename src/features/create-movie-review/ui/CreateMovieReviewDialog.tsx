'use client';

import { useState } from 'react';
import { CreateMovieReviewForm } from './CreateMovieReviewForm';
import { ReviewDialog } from '@entities/review';

type Props = {
  movieId: string;
};

export const CreateMovieReviewDialog = ({ movieId }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <ReviewDialog open={open} onOpenChange={setOpen} title="Write a review">
      <CreateMovieReviewForm
        movieId={movieId}
        onSuccess={() => setOpen(false)}
      />
    </ReviewDialog>
  );
};
