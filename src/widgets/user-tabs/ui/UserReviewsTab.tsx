'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import { Film, Tv } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { InfiniteScrollLoader } from '@shared/ui/infinite-scroll';
import { useTransition } from 'react';
import { GetUserReviewsDocument } from '@shared/api/graphql/graphql';
import { getMovieHref } from '@entities/movie';
import { ReviewListItem } from '@shared/ui/review-list-item';

type Props = {
  userId: string;
};

export const UserReviewsTab = ({ userId }: Props) => {
  const { data, fetchMore } = useSuspenseQuery(GetUserReviewsDocument, {
    variables: { userId, limit: 20 },
  });
  const [isPending, startTransition] = useTransition();

  const reviews =
    data?.getMoviesReviewsRelay.edges.map((edge) => edge.node) || [];
  const pageInfo = data?.getMoviesReviewsRelay.pageInfo;

  const handleLoadMore = () => {
    if (isPending || !pageInfo?.hasNextPage) {
      return;
    }

    startTransition(() => {
      fetchMore({
        variables: {
          cursor: pageInfo?.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return {
            getMoviesReviewsRelay: {
              ...fetchMoreResult.getMoviesReviewsRelay,
              edges: [
                ...prev.getMoviesReviewsRelay.edges,
                ...fetchMoreResult.getMoviesReviewsRelay.edges,
              ],
            },
          };
        },
      });
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No reviews yet.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 py-4">
        {reviews.map((review) => {
          const isSeries = review.movie.__typename === 'Series';
          const href = getMovieHref(review.movieId, review.movie.__typename);
          const NoImageIcon = isSeries ? Tv : Film;

          return (
            <ReviewListItem
              key={review.id}
              avatarSlot={
                <Link href={href} className="shrink-0">
                  <div className="relative aspect-[2/3] h-24 rounded-md overflow-hidden bg-muted">
                    {review.movie.cover ? (
                      <Image
                        src={review.movie.cover.url}
                        alt={review.movie.title || 'Movie cover'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-muted/50">
                        <NoImageIcon className="size-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </Link>
              }
              authorSlot={
                <>
                  <span className="text-muted-foreground select-none">
                    {isSeries ? 'Series' : 'Film'}{' '}
                  </span>
                  <Link
                    href={href}
                    className="font-heading font-semibold text-lg leading-tight text-foreground transition-colors group-hover:text-primary truncate"
                  >
                    {review.movie.title}
                  </Link>
                </>
              }
              rating={review.mark}
              text={review.text ?? ''}
              createdAt={review.createdAt}
            />
          );
        })}
      </div>
      <InfiniteScrollLoader
        onLoadMore={handleLoadMore}
        hasNextPage={pageInfo?.hasNextPage ?? false}
        isLoading={isPending}
      />
    </>
  );
};
