import { PreloadQuery } from '@shared/api/apollo/server';
import { GetCollectionMoviesDocument } from '@shared/api/graphql/graphql';
import { CollectionMoviesList } from '@widgets/collection-movies';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <PreloadQuery
      query={GetCollectionMoviesDocument}
      variables={{
        limit: 20,
        collectionId: id,
      }}
      context={{
        skipAuth: true,
      }}
    >
      {(queryRef) => (
        <CollectionMoviesList collectionId={Number(id)} queryRef={queryRef} />
      )}
    </PreloadQuery>
  );
};

export default Page;
