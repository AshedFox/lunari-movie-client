import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  CreateCollectionDocument,
  CreateCollectionInput,
} from '@shared/api/graphql/graphql';

export const createCollection = async (input: CreateCollectionInput) => {
  const { data } = await getClient().mutate({
    mutation: CreateCollectionDocument,
    variables: {
      input,
    },
  });

  return data!.createCollection;
};
