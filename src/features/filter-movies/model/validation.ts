import { AgeRestrictionEnum } from '@shared/api/graphql/graphql';
import { parseJsonPreprocessor } from '@shared/lib/zod';
import { z } from 'zod';

export const filterSchema = z.object(
  {
    title: z.string().catch(''),
    ageRestriction: z
      .preprocess(parseJsonPreprocessor, z.array(z.enum(AgeRestrictionEnum)))
      .catch([]),
    releaseDateFrom: z.iso.date().catch(''),
    releaseDateTo: z.iso.date().catch(''),
    countries: z
      .preprocess(parseJsonPreprocessor, z.array(z.string().length(2)))
      .catch([]),
    genres: z.preprocess(parseJsonPreprocessor, z.array(z.string())).catch([]),
    studios: z.preprocess(parseJsonPreprocessor, z.array(z.string())).catch([]),
  },
  { message: 'Invalid search parameters' },
);
