import 'server-only';

import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/experimental-nextjs-app-support';
import { from } from '@apollo/client';
import { removeTypenameLink } from '@lib/apollo/remove-typename-link';
import { authLink } from '@lib/apollo/rsc-auth-link';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { env } from '@lib/env/server';
import { dateParserLink } from './date-parser-link';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const uploadLink = createUploadLink({
    uri: `${env.NEXT_PUBLIC_API_URL}/graphql`,
    headers: {
      'Apollo-Require-Preflight': 'true',
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([dateParserLink, removeTypenameLink, authLink, uploadLink]),
  });
});
