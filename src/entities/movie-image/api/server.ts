import 'server-only';

import { DEFAULT_PAGE_SIZE } from '../config';
import { GetMovieImagesDocument } from '@shared/api/graphql/graphql';
import { getClient } from '@shared/api/apollo/server';

export const getMovieImages = async (movieId: string, page?: number) => {
  const { data } = await getClient().query({
    query: GetMovieImagesDocument,
    variables: {
      movieId,
      limit: DEFAULT_PAGE_SIZE,
      offset: page ? (page - 1) * DEFAULT_PAGE_SIZE : 0,
    },
  });

  return data!.getMoviesImages;
};
