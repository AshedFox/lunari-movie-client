import { CollectionReviewFragment } from '@shared/api/graphql/graphql';
import { ReviewListItem } from '@shared/ui/review-list-item';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar';
import { getInitials } from '@shared/lib/format/get-initials';
import Link from 'next/link';

type Props = {
  review: CollectionReviewFragment;
  userId?: string;
  className?: string;
};

export const CollectionReviewListItem = ({
  review,
  userId,
  className,
}: Props) => {
  const isOwn = review.user.id === userId;
  const userName = review.user.name ?? 'Unknown';

  return (
    <ReviewListItem
      className={className}
      avatarSlot={
        <Avatar className="aspect-square shrink-0 overflow-hidden rounded-full size-12 text-sm font-semibold border">
          <AvatarImage
            className="object-cover"
            src={review.user.avatar?.url ?? undefined}
          />
          <AvatarFallback>{getInitials(userName)}</AvatarFallback>
        </Avatar>
      }
      authorSlot={
        <Link
          href={`/users/${isOwn ? 'me' : review.user.id}`}
          className="hover:underline"
        >
          {userName}
          {isOwn && (
            <span className="text-muted-foreground text-xs align-text-top ml-1">
              (you)
            </span>
          )}
        </Link>
      }
      rating={review.mark}
      text={review.text ?? ''}
      createdAt={review.createdAt}
    />
  );
};
