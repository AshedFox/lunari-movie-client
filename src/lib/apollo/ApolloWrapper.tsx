'use client';

import { from } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { PropsWithChildren } from 'react';
import { GRAPHQL_URL } from '@lib/constants';
import { removeTypenameLink } from './remove-typename-link';
import { authLink } from '@lib/apollo/auth-link';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

function makeClient() {
  const uploadLink = createUploadLink({
    uri: GRAPHQL_URL,
    headers: {
      'Apollo-Require-Preflight': 'true',
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
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
