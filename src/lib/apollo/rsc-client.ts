import 'server-only';

import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { ApolloLink } from '@apollo/client';
import { removeTypenameLink } from '@lib/apollo/remove-typename-link';
import { authLink } from '@lib/apollo/rsc-auth-link';
import { env } from '@lib/env/server';
import { dateTypePolicies } from './date-type-policies';
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const uploadLink = new UploadHttpLink({
    uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
    headers: {
      'Apollo-Require-Preflight': 'true',
    },
  }) as ApolloLink;

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        ...dateTypePolicies,
      },
    }),
    link: ApolloLink.from([removeTypenameLink, authLink, uploadLink]),
  });
});
