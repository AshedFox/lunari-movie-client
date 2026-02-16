import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  UpdateCollectionDocument,
  UpdateCollectionInput,
} from '@shared/api/graphql/graphql';

export const updateCollection = async (
  id: number,
  input: UpdateCollectionInput,
) => {
  const { data } = await getClient().mutate({
    mutation: UpdateCollectionDocument,
    variables: {
      id,
      input,
    },
  });

  return data!.updateCollection;
};
