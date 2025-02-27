import 'server-only';

import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/experimental-nextjs-app-support';
import { from } from '@apollo/client';
import { GRAPHQL_URL } from '@lib/constants';
import { removeTypenameLink } from '@lib/apollo/remove-typename-link';
import { authLink } from '@lib/apollo/rsc-auth-link';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
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
});
