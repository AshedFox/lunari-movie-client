import Image from 'next/image';
import { ReactNode } from 'react';
import { Badge } from '@shared/ui/badge'; // Предполагаем shared UI
import { Star } from 'lucide-react';

type Props = {
  title: string;
  coverUrl?: string;
  rating: number;
  metaSlot?: ReactNode;
  actionSlot?: ReactNode;
};

export const MovieHeader = ({
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

      {/* Content */}
      <div className="relative space-y-6 container">
        {/* Title */}
        <h1 className="text-5xl font-bold leading-tight">{title}</h1>
        {/* Title Block */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Rating */}
          <Badge className="px-3 py-2 bg-yellow-500">
            <Star fill="currentColor" />
            <span>{rating === 0 ? '-' : rating.toFixed(1)}</span>
          </Badge>

          {metaSlot}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-2">{actionSlot}</div>
      </div>
    </header>
  );
};
