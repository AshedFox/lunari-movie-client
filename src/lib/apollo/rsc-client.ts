import 'server-only';

import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/experimental-nextjs-app-support';
import { from, HttpLink } from '@apollo/client';
import { API_URL } from '@lib/constants';
import { removeTypenameLink } from '@lib/apollo/remove-typename-link';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const httpLink = new HttpLink({ uri: API_URL });

  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: from([removeTypenameLink, httpLink]),
  });
});
