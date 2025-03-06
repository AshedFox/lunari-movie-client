import { AgeRestrictionEnum } from '@lib/graphql/generated/graphql';
import { parseJsonPreprocessor } from '@lib/validation/parse-json-preprocessor';
import { z } from 'zod';

export const filterSchema = z.object(
  {
    title: z.string().catch(''),
    ageRestriction: z
      .preprocess(
        parseJsonPreprocessor,
        z.array(z.nativeEnum(AgeRestrictionEnum)),
      )
      .catch([]),
    releaseDateFrom: z.string().date().catch(''),
    releaseDateTo: z.string().date().catch(''),
    countries: z
      .preprocess(parseJsonPreprocessor, z.array(z.string().length(2)))
      .catch([]),
    genres: z.preprocess(parseJsonPreprocessor, z.array(z.string())).catch([]),
    studios: z.preprocess(parseJsonPreprocessor, z.array(z.string())).catch([]),
  },
  { message: 'Invalid search parameters' },
);
