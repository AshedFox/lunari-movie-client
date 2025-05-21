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
  const { data, errors } = await getClient().mutate({
    mutation: UploadImageDocument,
    variables: {
      file,
    },
    errorPolicy: 'all',
  });

  if (errors || !data) {
    return { error: 'Failed to upload' };
  }

  return { data };
}
