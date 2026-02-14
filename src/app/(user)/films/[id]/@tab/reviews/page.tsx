import { CreateMovieReviewDialog } from '@components/movie-review/create';
import { MovieReviewsLoadableList } from '@components/movie-review/list';
import { PreloadQuery } from '@lib/apollo/rsc-client';
import { getCurrentUser } from '@services/user.service';
import {
  GetMovieReviewsDocument,
  SortDirectionEnum,
} from '@lib/graphql/generated/graphql';
import { hasMovieReview } from '@services/movie-review.service';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const [user, hasReview] = await Promise.all([
    getCurrentUser(),
    hasMovieReview(id),
  ]);

  return (
    <div className="space-y-4">
      {user && !hasReview && <CreateMovieReviewDialog movieId={id} />}
      <PreloadQuery
        query={GetMovieReviewsDocument}
        variables={{
          limit: 20,
          movieId: id,
          sort: { createdAt: { direction: SortDirectionEnum.DESC } },
        }}
        context={{
          fetchOptions: {
            next: { tags: [`movie-reviews-${id}`] },
          },
        }}
      >
        {(queryRef) => (
          <MovieReviewsLoadableList
            userId={user?.id}
            movieId={id}
            queryRef={queryRef}
          />
        )}
      </PreloadQuery>
    </div>
  );
};

export default Page;
