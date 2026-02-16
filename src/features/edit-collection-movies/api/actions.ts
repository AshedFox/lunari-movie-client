'use server';

import { revalidateTag } from 'next/cache';
import { addCollectionMovie, deleteCollectionMovie } from './server';

export async function addCollectionMovieAction(
  collectionId: number,
  movieId: string,
) {
  const data = await addCollectionMovie(collectionId, movieId);

  revalidateTag(`collections-${collectionId}-movies`, 'max');

  return data;
}

export async function deleteCollectionMovieAction(
  collectionId: number,
  movieId: string,
) {
  const data = await deleteCollectionMovie(collectionId, movieId);

  revalidateTag(`collections-${collectionId}-movies`, 'max');

  return data;
}
