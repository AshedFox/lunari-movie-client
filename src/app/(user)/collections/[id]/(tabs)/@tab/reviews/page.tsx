import { CreateCollectionReviewDialog } from '@components/collection-review/create';
import { CollectionReviewsLoadableList } from '@components/collection-review/list';
import { PreloadQuery } from '@lib/apollo/rsc-client';
import { getCurrentUser } from '@services/user.service';
import {
  GetCollectionReviewsDocument,
  SortDirectionEnum,
} from '@lib/graphql/generated/graphql';
import { paramsSchema } from '../../../_validation/params-schema';
import { hasCollectionReview } from '@services/collection-review.service';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = paramsSchema.parse(await params);

  const [hasReview, user] = await Promise.all([
    hasCollectionReview(id),
    getCurrentUser(),
  ]);

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
