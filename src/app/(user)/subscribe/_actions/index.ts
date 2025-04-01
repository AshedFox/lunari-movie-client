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
  const { data, errors } = await getClient().mutate({
    mutation: SubscribeDocument,
    variables: {
      priceId,
    },
    errorPolicy: 'all',
  });

  if (!data || errors) {
    return {
      error:
        errors && errors[0].message ? errors[0].message : 'Failed to subscribe',
    };
  }

  redirect(data.subscribe);
}
