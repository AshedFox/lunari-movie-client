import {
  MovieSort,
  SortDirectionEnum,
  SortNullsEnum,
} from '@lib/graphql/generated/graphql';
import { SORT_VARIANTS } from './constants';

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
    case 'most_popular': {
      return {
        stats: {
          popularityScore: {
            direction: SortDirectionEnum.DESC,
            nulls: SortNullsEnum.LAST,
          },
        },
      };
    }
    case 'most_reviewed': {
      return {
        stats: {
          reviewsCount: {
            direction: SortDirectionEnum.DESC,
            nulls: SortNullsEnum.LAST,
          },
        },
      };
    }
  }
};
