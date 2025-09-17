'use server';

import { getClient } from '@lib/apollo/rsc-client';
import { graphql } from '@lib/graphql/generated';
import { redirect } from 'next/navigation';

const SubscribeDocument = graphql(`
  mutation Subscribe($priceId: String!) {
    subscribe(priceId: $priceId)
  }
`);

export async function subscribe(priceId: string) {
  const { data, error } = await getClient().mutate({
    mutation: SubscribeDocument,
    variables: {
      priceId,
    },
    errorPolicy: 'all',
  });

  if (!data || error) {
    return {
      error: error?.message ?? 'Failed to subscribe',
    };
  }

  redirect(data.subscribe);
}
