'use client';

import { useSuspenseQuery } from '@apollo/client/react';
import { GetUserReviewsDocument } from '@lib/graphql/generated/graphql';
import { Badge } from '@components/ui/badge';
import { Star, Film, Tv } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FormattedDateRelative } from '@components/ui/formatted-date-relative';
import { InfiniteScrollLoader } from '@components/ui/infinite-scroll';
import { useTransition } from 'react';

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
          const href = `/${isSeries ? 'series' : 'films'}/${review.movie.id}`;
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
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
                    <FormattedDateRelative date={review.createdAt} />
                  </div>
                </div>

                {/* Rating Badge */}
                <Badge className="bg-yellow-500">
                  <Star size={10} fill="currentColor" />
                  {review.mark}
                </Badge>
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
