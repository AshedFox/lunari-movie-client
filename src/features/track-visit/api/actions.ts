'use server';

import { trackMovieVisit } from './server';

export async function trackMovieVisitAction(movieId: string) {
  return await trackMovieVisit(movieId);
}
