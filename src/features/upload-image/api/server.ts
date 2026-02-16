import 'server-only';

import { getClient } from '@shared/api/apollo/server';
import { UploadImageDocument } from '@shared/api/graphql/graphql';

export const uploadImage = async (file: File) => {
  const { data } = await getClient().mutate({
    mutation: UploadImageDocument,
    variables: {
      file,
    },
  });

  return data!.uploadImage;
};
