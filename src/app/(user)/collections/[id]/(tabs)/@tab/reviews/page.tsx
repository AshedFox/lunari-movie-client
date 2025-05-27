import { CreateCollectionReviewDialog } from '@components/collection-review/create';
import { CollectionReviewsLoadableList } from '@components/collection-review/list';
import { getClient, PreloadQuery } from '@lib/apollo/rsc-client';
import { getUser } from '@lib/auth/user-dal';
import {
  HasCollectionReviewDocument,
  GetCollectionReviewsDocument,
  SortDirectionEnum,
} from '@lib/graphql/generated/graphql';
import { paramsSchema } from '../../../_validation/params-schema';

const userHasReview = async (collectionId: number): Promise<boolean | null> => {
  const { data } = await getClient().query({
    query: HasCollectionReviewDocument,
    variables: {
      collectionId,
    },
    errorPolicy: 'all',
  });

  return data?.hasCollectionReview ?? null;
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = paramsSchema.parse(await params);
  const user = await getUser();
  const hasReview = await userHasReview(id);

  return (
    <div className="space-y-4">
      {user && !hasReview && <CreateCollectionReviewDialog collectionId={id} />}
      <PreloadQuery
        query={GetCollectionReviewsDocument}
        variables={{
          limit: 20,
          collectionId: id,
          sort: { createdAt: { direction: SortDirectionEnum.DESC } },
        }}
        context={{
          fetchOptions: {
            next: { tags: [`collection-reviews-${id}`] },
          },
        }}
      >
        {(queryRef) => (
          <CollectionReviewsLoadableList
            userId={user?.id}
            collectionId={id}
            queryRef={queryRef}
          />
        )}
      </PreloadQuery>
    </div>
  );
};

export default Page;
