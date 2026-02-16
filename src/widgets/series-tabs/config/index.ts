import { GetSeriesTabsInfoQuery } from '@shared/api/graphql/graphql';

export type SeriesTab = {
  value: string;
  label: string;
  href: string;
  count?: number;
};

export const getSeriesTabsConfig = (
  id: string,
  info: GetSeriesTabsInfoQuery['getOneSeries'],
): SeriesTab[] => [
  {
    value: '(slot)',
    label: 'About',
    href: `/series/${id}`,
  },
  {
    value: 'trailers',
    label: 'Trailers',
    href: `/series/${id}/trailers`,
    count: info.trailersCount,
  },
  {
    value: 'images',
    label: 'Images',
    href: `/series/${id}/images`,
    count: info.movieImagesCount,
  },
  {
    value: 'persons',
    label: 'Persons',
    href: `/series/${id}/persons`,
    count: info.moviePersonsCount,
  },
  {
    value: 'reviews',
    label: 'Reviews',
    href: `/series/${id}/reviews`,
    count: info.reviewsCount,
  },
];
