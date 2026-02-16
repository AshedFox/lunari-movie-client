import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { CountrySort, GetCountriesDocument } from '@shared/api/graphql/graphql';

export const getCountries = async (sort?: CountrySort) => {
  const { data } = await getClient().query({
    query: GetCountriesDocument,
    variables: { sort },
    context: { skipAuth: true },
  });

  return data!.getAllCountries;
};
