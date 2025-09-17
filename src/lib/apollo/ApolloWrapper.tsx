'use client';

import { ApolloLink } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { PropsWithChildren } from 'react';
import { removeTypenameLink } from './remove-typename-link';
import { authLink } from '@lib/apollo/auth-link';
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs';
import { env } from '@lib/env/client';
import { dateTypePolicies } from './date-type-policies';

function makeClient() {
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
}

export function ApolloWrapper({ children }: PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
