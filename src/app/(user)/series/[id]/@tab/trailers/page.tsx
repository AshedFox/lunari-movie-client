import { TrailersList } from '@widgets/trailers-list';
import { PreloadQuery } from '@shared/api/apollo/server';
import { GetTrailersDocument } from '@shared/api/graphql/graphql';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <PreloadQuery
        query={GetTrailersDocument}
        variables={{
          limit: 20,
          offset: 0,
          movieId: id,
        }}
      >
        {(queryRef) => <TrailersList movieId={id} queryRef={queryRef} />}
      </PreloadQuery>
    </div>
  );
};

export default Page;
