'use server';

import {
  CreateMovieUserInput,
  UpdateMovieUserInput,
} from '@shared/api/graphql/graphql';
import { createMovieUser, updateMovieUser } from './server';
import { revalidateTag, updateTag } from 'next/cache';

export async function createMovieUserAction(input: CreateMovieUserInput) {
  const data = await createMovieUser(input);

  revalidateTag(`movies-${data.movieId}-users`, 'max');
  updateTag(`movies-${data.movieId}-users-${data.userId}`);

  return data;
}

export async function updateMovieUserAction(
  userId: string,
  movieId: string,
  input: UpdateMovieUserInput,
) {
  const data = await updateMovieUser(userId, movieId, input);

  revalidateTag(`movies-${movieId}-users`, 'max');
  updateTag(`movies-${movieId}-users-${userId}`);

  return data;
}
