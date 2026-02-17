'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import { RatingBadge } from '@shared/ui/rating-badge';
import { Film, Tv } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { DateBadge } from '@shared/ui/date-badge';
import { InfiniteScrollLoader } from '@shared/ui/infinite-scroll';
import { useTransition } from 'react';
import { GetUserReviewsDocument } from '@shared/api/graphql/graphql';
import { getMovieHref } from '@entities/movie';

interface UserReviewsTabProps {
  userId: string;
}

export function UserReviewsTab({ userId }: UserReviewsTabProps) {
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
          const href = getMovieHref(
            review.movie.id,
            isSeries ? 'Series' : 'Film',
          );
          const NoImageIcon = isSeries ? Tv : Film;

          return (
            <div
              key={review.id}
              className="group flex flex-col gap-4 p-5 border rounded-xl bg-card/40"
            >
              {/* Movie Context */}
              <div className="flex gap-4 items-start border-b border-border/40 pb-4">
                {/* Movie Cover */}
                <Link href={href} className="shrink-0">
                  <div className="relative aspect-[2/3] h-16 rounded-md overflow-hidden bg-muted">
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

                {/* Movie Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={href}
                    className="font-heading font-semibold text-lg leading-tight text-foreground transition-colors group-hover:text-primary truncate"
                  >
                    {review.movie.title}
                  </Link>
                  <DateBadge date={review.createdAt} />
                </div>

                {/* Rating Badge */}
                <RatingBadge rating={review.mark} />
              </div>

              {/* Review Content */}
              <div className="text-sm text-foreground/90 leading-relaxed">
                <p className="line-clamp-4">{review.text}</p>
              </div>
            </div>
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
}
