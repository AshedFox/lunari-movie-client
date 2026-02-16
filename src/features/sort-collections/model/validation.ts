import { z } from 'zod';
import { SORT_VARIANTS } from '../config/constants';

export const collectionSortSchema = z
  .enum(SORT_VARIANTS)
  .catch(SORT_VARIANTS[0]);
