import { TrailersLoadableList } from '@components/trailer/list';
import { PreloadQuery } from '@lib/apollo/rsc-client';
import { GetTrailersDocument } from '@lib/graphql/generated/graphql';

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
        {(queryRef) => (
          <TrailersLoadableList movieId={id} queryRef={queryRef} />
        )}
      </PreloadQuery>
    </div>
  );
};

export default Page;
