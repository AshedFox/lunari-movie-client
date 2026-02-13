import 'server-only';

import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { ApolloLink, HttpLink } from '@apollo/client';
import { removeTypenameLink } from '@lib/apollo/remove-typename-link';
import { authLink } from '@lib/apollo/rsc-auth-link';
import { env } from '@lib/env/server';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
    headers: {
      'Apollo-Require-Preflight': 'true',
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([removeTypenameLink, authLink, httpLink]),
  });
});
