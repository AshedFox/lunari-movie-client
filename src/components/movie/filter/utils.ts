import { MovieFilter } from '@lib/graphql/generated/graphql';
import { FilterSearchParams } from './types';

export const parseSearchToFilter = (
  search: FilterSearchParams,
  releaseDateVariance: 'film' | 'series' | 'both' = 'both',
): MovieFilter => {
  const releaseDateFilter =
    releaseDateVariance === 'both'
      ? {
          releaseDate: {
            gte: search.releaseDateFrom || undefined,
            lte: search.releaseDateTo || undefined,
          },
          startReleaseDate: {
            gte: search.releaseDateFrom || undefined,
          },
          endReleaseDate: {
            lte: search.releaseDateTo || undefined,
          },
        }
      : releaseDateVariance === 'film'
        ? {
            releaseDate: {
              gte: search.releaseDateFrom || undefined,
              lte: search.releaseDateTo || undefined,
            },
          }
        : {
            startReleaseDate: {
              gte: search.releaseDateFrom || undefined,
            },
            endReleaseDate: {
              lte: search.releaseDateTo || undefined,
            },
          };
  return {
    ...releaseDateFilter,
    title: {
      ilike: search.title || undefined,
    },
    ageRestriction: {
      in: search.ageRestriction.length > 0 ? search.ageRestriction : undefined,
    },
    genresConnection: {
      genreId: {
        in: search.genres.length > 0 ? search.genres : undefined,
      },
    },
    studiosConnection: {
      studioId: {
        in: search.studios.length > 0 ? search.studios : undefined,
      },
    },
    countriesConnection: {
      countryId: {
        in: search.countries.length > 0 ? search.countries : undefined,
      },
    },
  };
};
