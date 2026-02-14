import { getClient } from '@lib/apollo/rsc-client';
import {
  GetAllGenresDocument,
  SortDirectionEnum,
} from '@lib/graphql/generated/graphql';

export const getGenres = async () => {
  const { data } = await getClient().query({
    query: GetAllGenresDocument,
    variables: { sort: { name: { direction: SortDirectionEnum.ASC } } },
    context: { skipAuth: true },
  });

  return data!.getAllGenres;
};
