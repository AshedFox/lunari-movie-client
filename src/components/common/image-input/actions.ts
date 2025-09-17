'use server';

import { getClient } from '@lib/apollo/rsc-client';
import { graphql } from '@lib/graphql/generated';

const UploadImageDocument = graphql(`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      id
      url
    }
  }
`);

export async function uploadImage(file: File) {
  const { data, error } = await getClient().mutate({
    mutation: UploadImageDocument,
    variables: {
      file,
    },
    errorPolicy: 'all',
  });

  if (error || !data) {
    return { error: 'Failed to upload' };
  }

  return { data };
}
