import { PreloadQuery } from '@shared/api/apollo/server';
import { getCurrentUser } from '@entities/user/server';
import { hasMovieReview } from '@entities/movie-review/server';
import { CreateMovieReviewDialog } from '@features/create-movie-review';
import {
  GetMovieReviewsDocument,
  SortDirectionEnum,
} from '@shared/api/graphql/graphql';
import { MovieReviewsList } from '@widgets/movie-reviews-list';

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
          skipAuth: true,
        }}
      >
        {(queryRef) => (
          <MovieReviewsList
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
