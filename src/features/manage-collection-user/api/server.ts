import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import {
  CreateCollectionUserDocument,
  CreateCollectionUserInput,
  UpdateCollectionUserDocument,
  UpdateCollectionUserInput,
} from '@shared/api/graphql/graphql';

export const createCollectionUser = async (
  input: CreateCollectionUserInput,
) => {
  const { data } = await getClient().mutate({
    mutation: CreateCollectionUserDocument,
    variables: { input },
  });

  return data!.createCollectionUser;
};

export const updateCollectionUser = async (
  userId: string,
  collectionId: number,
  input: UpdateCollectionUserInput,
) => {
  const { data } = await getClient().mutate({
    mutation: UpdateCollectionUserDocument,
    variables: { collectionId, userId, input },
  });

  return data!.updateCollectionUser;
};
