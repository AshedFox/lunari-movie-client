'use server';

import { getClient } from '@lib/apollo/rsc-client';
import { graphql } from '@lib/graphql/generated';
import { revalidatePath } from 'next/cache';

const DeleteCollectionDocument = graphql(`
  mutation DeleteCollection($id: Int!) {
    deleteCollection(id: $id) {
      ...CollectionListItem
    }
  }
`);

export async function deleteCollection(id: number) {
  const { data, errors } = await getClient().mutate({
    mutation: DeleteCollectionDocument,
    variables: {
      id,
    },
    errorPolicy: 'all',
  });

  if (errors || !data) {
    return { error: 'Failed to delete collection' };
  }

  revalidatePath(`/collections/${id}`, 'layout');
  revalidatePath(`/users/me/collections`, 'page');
  return { data };
}
