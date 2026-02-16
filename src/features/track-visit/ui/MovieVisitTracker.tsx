'use client';

import { useEffect } from 'react';
import { trackMovieVisitAction } from '../api/actions';

type Props = {
  movieId: string;
};

export const MovieVisitTracker = ({ movieId }: Props) => {
  useEffect(() => {
    trackMovieVisitAction(movieId);
  }, [movieId]);

  return null;
};
