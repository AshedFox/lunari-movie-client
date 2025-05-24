import { CollectionMoviesLoadableList } from '@components/collection-movie/list';
import { PreloadQuery } from '@lib/apollo/rsc-client';
import { GetCollectionMoviesDocument } from '@lib/graphql/generated/graphql';
import { paramsSchema } from '../../_validation/params-schema';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = paramsSchema.parse(await params);

  return (
    <PreloadQuery
      query={GetCollectionMoviesDocument}
      variables={{
        limit: 20,
        collectionId: String(id),
      }}
      context={{
        skipAuth: true,
      }}
    >
      {(queryRef) => (
        <CollectionMoviesLoadableList collectionId={id} queryRef={queryRef} />
      )}
    </PreloadQuery>
  );
};

export default Page;
