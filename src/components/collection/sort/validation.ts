import { z } from 'zod';
import { SORT_VARIANTS } from './constants';

export const sortSchema = z.enum(SORT_VARIANTS).catch(SORT_VARIANTS[0]);
