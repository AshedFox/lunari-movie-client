import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { CountrySort, GetCountriesDocument } from '@shared/api/graphql/graphql';
import { cacheLife, cacheTag } from 'next/cache';

export const getCountries = async (sort?: CountrySort) => {
  'use cache';
  cacheLife('weeks');
  cacheTag('countries');

  const { data } = await getClient().query({
    query: GetCountriesDocument,
    variables: { sort },
    context: { skipAuth: true },
  });

  return data!.getAllCountries;
};
