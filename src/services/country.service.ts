import { getClient } from '@lib/apollo/rsc-client';
import {
  GetCountriesDocument,
  SortDirectionEnum,
} from '@lib/graphql/generated/graphql';

export const getCountries = async () => {
  const { data } = await getClient().query({
    query: GetCountriesDocument,
    variables: { sort: { name: { direction: SortDirectionEnum.ASC } } },
    context: { skipAuth: true },
  });

  return data!.getAllCountries;
};
