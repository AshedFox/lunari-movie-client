'use client';

import { skipToken, useSuspenseQuery } from '@apollo/client/react';
import { Button, buttonVariants } from '@components/ui/button';
import {
  HasActiveSubscriptionDocument,
  HasPurchaseDocument,
} from '@lib/graphql/generated/graphql';
import { cn } from '@lib/utils';
import { Play } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  filmId: string;
  userId?: string;
  videoId?: number;
};

const WatchButton = ({ filmId, userId, videoId }: Props) => {
  const { data: subscriptionData } = useSuspenseQuery(
    HasActiveSubscriptionDocument,
    userId && videoId
      ? {
          errorPolicy: 'all',
        }
      : skipToken,
  );
  const { data: purchaseData } = useSuspenseQuery(
    HasPurchaseDocument,
    userId && videoId
      ? {
          variables: {
            movieId: filmId,
          },
          errorPolicy: 'all',
        }
      : skipToken,
  );
  const pathname = usePathname();

  if (!videoId) {
    return (
      <Button disabled className={'w-48'}>
        Will be soon...
      </Button>
    );
  }

  if (!userId) {
    return (
      <Link
        href={`/login?from=${pathname}`}
        className={cn(buttonVariants(), 'w-48')}
      >
        <Play size={18} /> Watch
      </Link>
    );
  }
  const hasAccess =
    !!subscriptionData?.hasActiveSubscription || !!purchaseData?.hasPurchase;

  if (!hasAccess) {
    return (
      <Link
        href={`/subscribe?from=${pathname}`}
        className={cn(buttonVariants(), 'w-48')}
      >
        <Play size={18} /> Watch
      </Link>
    );
  }

  return (
    <Link
      href={`/films/watch/${filmId}`}
      className={cn(buttonVariants(), 'w-48')}
    >
      <Play size={18} /> Watch
    </Link>
  );
};

export default WatchButton;
