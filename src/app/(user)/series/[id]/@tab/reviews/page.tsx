import { CreateMovieReviewDialog } from '@components/movie-review/create';
import { MovieReviewsLoadableList } from '@components/movie-review/list';
import { getClient, PreloadQuery } from '@lib/apollo/rsc-client';
import { getUser } from '@lib/auth/user-dal';
import {
  HasMovieReviewDocument,
  GetMovieReviewsDocument,
  SortDirectionEnum,
} from '@lib/graphql/generated/graphql';

const userHasReview = async (filmId: string): Promise<boolean | null> => {
  const { data } = await getClient().query({
    query: HasMovieReviewDocument,
    variables: {
      movieId: filmId,
    },
    errorPolicy: 'all',
  });

  return data?.hasMovieReview ?? null;
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const user = await getUser();
  const hasReview = await userHasReview(id);

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
