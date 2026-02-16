import { GetFilmTabsInfoQuery } from '@shared/api/graphql/graphql';

export type FilmTab = {
  value: string;
  label: string;
  href: string;
  count?: number;
};

export const getFilmTabsConfig = (
  id: string,
  info: GetFilmTabsInfoQuery['getFilm'],
): FilmTab[] => [
  {
    value: '(slot)',
    label: 'About',
    href: `/films/${id}`,
  },
  {
    value: 'trailers',
    label: 'Trailers',
    href: `/films/${id}/trailers`,
    count: info.trailersCount,
  },
  {
    value: 'images',
    label: 'Images',
    href: `/films/${id}/images`,
    count: info.movieImagesCount,
  },
  {
    value: 'persons',
    label: 'Persons',
    href: `/films/${id}/persons`,
    count: info.moviePersonsCount,
  },
  {
    value: 'reviews',
    label: 'Reviews',
    href: `/films/${id}/reviews`,
    count: info.reviewsCount,
  },
];
