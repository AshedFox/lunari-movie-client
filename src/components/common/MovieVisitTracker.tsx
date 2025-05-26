'use client';

import { useMutation } from '@apollo/client';
import { graphql } from '@lib/graphql/generated';
import { useEffect } from 'react';

const TrackMovieVisitDocument = graphql(`
  mutation TrackMovieVisit($movieId: String!) {
    trackMovieVisit(movieId: $movieId) {
      movieId
      userId
      visitedAt
    }
  }
`);

type Props = {
  movieId: string;
};

const MovieVisitTracker = ({ movieId }: Props) => {
  const [trackMovieVisit] = useMutation(TrackMovieVisitDocument, {
    variables: {
      movieId,
    },
    errorPolicy: 'all',
  });

  useEffect(() => {
    trackMovieVisit();
  }, [trackMovieVisit]);

  return null;
};

export default MovieVisitTracker;
