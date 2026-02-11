import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { MovieReviewFragment } from '@lib/graphql/generated/graphql';
import { FormattedDateRelative } from '@components/ui/formatted-date-relative';
import { Star } from 'lucide-react';
import Link from 'next/link';

type Props = {
  review: MovieReviewFragment;
  userId?: string;
};

const MovieReviewListItem = ({ review, userId }: Props) => {
  return (
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <Avatar className="aspect-square shrink-0 overflow-hidden rounded-full size-12 text-sm font-semibold border">
          <AvatarImage className="object-cover" src={review.user.avatar?.url} />
          <AvatarFallback>
            {review.user.name
              .split(' ')
              .map((word) => word[0].toUpperCase())
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold">
              <Link
                href={`/users/${userId === review.user.id ? 'me' : review.user.id}`}
              >
                {review.user.name}
                {userId === review.user.id && (
                  <span className="text-muted-foreground text-xs align-text-top">
                    (you)
                  </span>
                )}
              </Link>
            </h3>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Star
                  className="text-yellow-500"
                  fill="currentColor"
                  size={16}
                />
                <span className="font-bold">{review.mark}</span>
              </span>
              <FormattedDateRelative
                className="text-sm text-muted-foreground"
                date={review.createdAt}
              />
            </div>
          </div>
          <p className="text-muted-foreground text-sm">{review.text}</p>
        </div>
      </div>
    </div>
  );
};

export { MovieReviewListItem };
