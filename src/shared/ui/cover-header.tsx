import Image from 'next/image';
import { ReactNode } from 'react';
import { RatingBadge } from '@shared/ui/rating-badge';

type Props = {
  title: string;
  coverUrl?: string | null;
  rating: number;
  metaSlot?: ReactNode;
  actionSlot?: ReactNode;
};

export const CoverHeader = ({
  title,
  coverUrl,
  rating,
  metaSlot,
  actionSlot,
}: Props) => {
  return (
    <header className="space-y-8">
      <div className="relative w-full aspect-[3/1] bg-muted">
        {coverUrl && (
          <Image
            src={coverUrl}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
      </div>

      <div className="relative space-y-6 container">
        <h1 className="text-5xl font-bold leading-tight">{title}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <RatingBadge size="lg" rating={rating} />

          {metaSlot}
        </div>

        {actionSlot && (
          <div className="flex items-center gap-4 pt-2">{actionSlot}</div>
        )}
      </div>
    </header>
  );
};
