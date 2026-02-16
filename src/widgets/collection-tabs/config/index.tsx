import { GetCollectionTabsInfoQuery } from '@shared/api/graphql/graphql';
import { Film, Star } from 'lucide-react';
import { ReactNode } from 'react';

export type CollectionTab = {
  value: string | null;
  href: string;
  label: ReactNode;
};

export const getCollectionTabsConfig = (
  id: number,
  info: GetCollectionTabsInfoQuery['getCollection'],
): CollectionTab[] => [
  {
    value: null,
    href: `/collections/${id}`,
    label: (
      <span className="flex items-center gap-1">
        <Film size={14} />
        <span>
          <span>Movies</span>
          <span className="text-xs align-text-top">({info.moviesCount})</span>
        </span>
      </span>
    ),
  },
  {
    href: `/collections/${id}/reviews`,
    value: 'reviews',
    label: (
      <span className="flex items-center gap-1">
        <Star size={14} />
        <span>
          <span>Reviews</span>
          <span className="text-xs align-text-top">({info.reviewsCount})</span>
        </span>
      </span>
    ),
  },
];
