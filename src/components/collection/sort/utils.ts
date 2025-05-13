import {
  CollectionSort,
  SortDirectionEnum,
  SortNullsEnum,
} from '@lib/graphql/generated/graphql';
import { SORT_VARIANTS } from './constants';

export const parseSearchToSort = (
  sort: (typeof SORT_VARIANTS)[number],
): CollectionSort => {
  switch (sort) {
    case 'name_asc':
      return {
        name: {
          direction: SortDirectionEnum.ASC,
        },
      };
    case 'name_desc':
      return {
        name: {
          direction: SortDirectionEnum.DESC,
        },
      };
    case 'created_at_asc': {
      return {
        createdAt: {
          direction: SortDirectionEnum.ASC,
          nulls: SortNullsEnum.LAST,
        },
      };
    }
    case 'created_at_desc': {
      return {
        createdAt: {
          direction: SortDirectionEnum.DESC,
          nulls: SortNullsEnum.LAST,
        },
      };
    }
    case 'updated_at_asc': {
      return {
        updatedAt: {
          direction: SortDirectionEnum.ASC,
          nulls: SortNullsEnum.LAST,
        },
      };
    }
    case 'updated_at_desc': {
      return {
        updatedAt: {
          direction: SortDirectionEnum.DESC,
          nulls: SortNullsEnum.LAST,
        },
      };
    }
  }
};
