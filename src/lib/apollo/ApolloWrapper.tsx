'use client';

import { from } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { PropsWithChildren } from 'react';
import { removeTypenameLink } from './remove-typename-link';
import { authLink } from '@lib/apollo/auth-link';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { env } from '@lib/env/client';
import { dateTypePolicies } from './date-type-policies';

function makeClient() {
  const uploadLink = createUploadLink({
    uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
    headers: {
      'Apollo-Require-Preflight': 'true',
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        ...dateTypePolicies,
      },
    }),
    link: from([removeTypenameLink, authLink, uploadLink]),
  });
}

export function ApolloWrapper({ children }: PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
