import { hasCollectionReview } from '@entities/collection-review/server';
import { getCurrentUser } from '@entities/user/server';
import { CreateCollectionReviewDialog } from '@features/create-collection-review';
import { PreloadQuery } from '@shared/api/apollo/server';
import {
  GetCollectionReviewsDocument,
  SortDirectionEnum,
} from '@shared/api/graphql/graphql';
import { CollectionReviewsList } from '@widgets/collection-reviews';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const [hasReview, user] = await Promise.all([
    hasCollectionReview(Number(id)),
    getCurrentUser(),
  ]);

  return (
    <div className="space-y-4">
      {user && !hasReview && (
        <CreateCollectionReviewDialog collectionId={Number(id)} />
      )}
      <PreloadQuery
        query={GetCollectionReviewsDocument}
        variables={{
          limit: 20,
          collectionId: Number(id),
          sort: { createdAt: { direction: SortDirectionEnum.DESC } },
        }}
        context={{
          fetchOptions: {
            next: { tags: [`collection-reviews-${id}`] },
          },
        }}
      >
        {(queryRef) => (
          <CollectionReviewsList
            userId={user?.id}
            collectionId={Number(id)}
            queryRef={queryRef}
          />
        )}
      </PreloadQuery>
    </div>
  );
};

export default Page;
