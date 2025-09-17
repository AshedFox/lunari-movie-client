'use server';

import { getClient } from '@lib/apollo/rsc-client';
import { graphql } from '@lib/graphql/generated';
import { CreateCollectionInput } from '@lib/graphql/generated/graphql';
import { revalidatePath } from 'next/cache';

const CreateCollectionDocument = graphql(`
  mutation CreateCollection($input: CreateCollectionInput!) {
    createCollection(input: $input) {
      ...Collection
    }
  }
`);

export async function createCollection(input: CreateCollectionInput) {
  const { data, error } = await getClient().mutate({
    mutation: CreateCollectionDocument,
    variables: {
      input,
    },
    errorPolicy: 'all',
  });

  if (error || !data) {
    return { error: 'Failed to create collection' };
  }

  revalidatePath(`/users/me/collections`, 'page');
  return { data };
}
