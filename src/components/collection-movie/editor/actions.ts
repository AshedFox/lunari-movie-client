'use server';

import { getClient } from '@lib/apollo/rsc-client';
import { graphql } from '@lib/graphql/generated';

const AddCollectionMovieDocument = graphql(`
  mutation AddCollectionMovie($collectionId: Int!, $movieId: String!) {
    createCollectionMovie(collectionId: $collectionId, movieId: $movieId) {
      collectionId
      movieId
    }
  }
`);

export async function addCollectionMovie(
  collectionId: number,
  movieId: string,
) {
  const { data, errors } = await getClient().mutate({
    mutation: AddCollectionMovieDocument,
    variables: {
      collectionId,
      movieId,
    },
    errorPolicy: 'all',
  });

  if (errors || !data) {
    return { error: 'Failed to add movie to collection' };
  }

  return { data };
}

const DeleteCollectionMovieDocument = graphql(`
  mutation DeleteCollectionMovie($collectionId: Int!, $movieId: String!) {
    deleteCollectionMovie(collectionId: $collectionId, movieId: $movieId) {
      collectionId
      movieId
    }
  }
`);

export async function deleteCollectionMovie(
  collectionId: number,
  movieId: string,
) {
  const { data, errors } = await getClient().mutate({
    mutation: DeleteCollectionMovieDocument,
    variables: {
      collectionId,
      movieId,
    },
    errorPolicy: 'all',
  });

  if (errors || !data) {
    return { error: 'Failed to delete movie from collection' };
  }

  return { data };
}
