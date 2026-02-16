import { CollectionFilter } from '@shared/api/graphql/graphql';
import { FilterSearchParams } from '../model/types';

export const parseSearchToFilter = (
  search: FilterSearchParams,
): CollectionFilter => {
  return {
    name: { ilike: search.name || undefined },
    createdAt: {
      gte: search.createdAtFrom || undefined,
      lte: search.createdAtTo || undefined,
    },
    updatedAt: {
      gte: search.updatedAtFrom || undefined,
      lte: search.updatedAtTo || undefined,
    },
    isSystem: { eq: search?.isSystem ?? undefined },
  };
};
