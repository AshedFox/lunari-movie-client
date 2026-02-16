import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  AddCollectionMovieDocument,
  DeleteCollectionMovieDocument,
} from '@shared/api/graphql/graphql';

export async function addCollectionMovie(
  collectionId: number,
  movieId: string,
) {
  const { data } = await getClient().mutate({
    mutation: AddCollectionMovieDocument,
    variables: { collectionId, movieId },
  });

  return data!.createCollectionMovie;
}

export async function deleteCollectionMovie(
  collectionId: number,
  movieId: string,
) {
  const { data } = await getClient().mutate({
    mutation: DeleteCollectionMovieDocument,
    variables: { collectionId, movieId },
  });

  return data!.deleteCollectionMovie;
}
