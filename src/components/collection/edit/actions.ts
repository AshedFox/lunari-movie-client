'use server';

import { getClient } from '@lib/apollo/rsc-client';
import { graphql } from '@lib/graphql/generated';
import { UpdateCollectionInput } from '@lib/graphql/generated/graphql';
import { revalidatePath } from 'next/cache';

const UpdateCollectionDocument = graphql(`
  mutation UpdateCollection($id: Int!, $input: UpdateCollectionInput!) {
    updateCollection(id: $id, input: $input) {
      ...Collection
    }
  }
`);

export async function updateCollection(
  id: number,
  input: UpdateCollectionInput,
) {
  const { data, errors } = await getClient().mutate({
    mutation: UpdateCollectionDocument,
    variables: {
      id,
      input,
    },
    errorPolicy: 'all',
  });

  if (errors || !data) {
    return { error: 'Failed to update collection' };
  }

  revalidatePath(`/collections/${id}`, 'layout');
  return { data };
}
