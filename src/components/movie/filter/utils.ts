import {
  MovieFilter,
  MovieSort,
  SortDirectionEnum,
  SortNullsEnum,
} from '@lib/graphql/generated/graphql';
import { FilterSearchParams } from './types';
import { SORT_VARIANTS } from '../sort';

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

export const parseSearchToSort = (
  sort: (typeof SORT_VARIANTS)[number],
  releaseDateVariance: 'film' | 'series' | 'both' = 'both',
): MovieSort => {
  switch (sort) {
    case 'title_asc':
      return {
        title: {
          direction: SortDirectionEnum.ASC,
        },
      };
    case 'title_desc':
      return {
        title: {
          direction: SortDirectionEnum.DESC,
        },
      };
    case 'release_date_asc': {
      switch (releaseDateVariance) {
        case 'both':
          return {
            releaseDate: {
              direction: SortDirectionEnum.ASC,
              nulls: SortNullsEnum.LAST,
            },
            startReleaseDate: {
              direction: SortDirectionEnum.ASC,
              nulls: SortNullsEnum.LAST,
            },
          };
        case 'film':
          return {
            releaseDate: {
              direction: SortDirectionEnum.ASC,
              nulls: SortNullsEnum.LAST,
            },
          };
        case 'series':
          return {
            startReleaseDate: {
              direction: SortDirectionEnum.ASC,
              nulls: SortNullsEnum.LAST,
            },
            endReleaseDate: {
              direction: SortDirectionEnum.ASC,
              nulls: SortNullsEnum.LAST,
            },
          };
      }
    }
    case 'release_date_desc': {
      switch (releaseDateVariance) {
        case 'both':
          return {
            releaseDate: {
              direction: SortDirectionEnum.DESC,
              nulls: SortNullsEnum.LAST,
            },
            startReleaseDate: {
              direction: SortDirectionEnum.DESC,
              nulls: SortNullsEnum.LAST,
            },
          };

        case 'film':
          return {
            releaseDate: {
              direction: SortDirectionEnum.DESC,
              nulls: SortNullsEnum.LAST,
            },
          };

        case 'series':
          return {
            startReleaseDate: {
              direction: SortDirectionEnum.DESC,
              nulls: SortNullsEnum.LAST,
            },
            endReleaseDate: {
              direction: SortDirectionEnum.DESC,
              nulls: SortNullsEnum.LAST,
            },
          };
      }
    }
  }
};
