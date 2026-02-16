import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { DeleteCollectionDocument } from '@shared/api/graphql/graphql';

export const deleteCollection = async (id: number) => {
  const { data } = await getClient().mutate({
    mutation: DeleteCollectionDocument,
    variables: { id },
  });

  return data!.deleteCollection;
};
