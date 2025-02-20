'use client';

import { from, HttpLink } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { PropsWithChildren } from 'react';
import { API_URL } from '@lib/constants';
import { removeTypenameLink } from './remove-typename-link';

function makeClient() {
  const httpLink = new HttpLink({
    uri: API_URL,
    fetchOptions: { cache: 'no-store' },
  });

  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: from([removeTypenameLink, httpLink]),
  });
}

export function ApolloWrapper({ children }: PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
