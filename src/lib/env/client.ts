'use client';

import { z, ZodFormattedError } from 'zod';
import { clientEnvSchema } from './schema';

export const clientEnv: {
  [k in keyof z.infer<typeof clientEnvSchema>]:
    | z.infer<typeof clientEnvSchema>[k]
    | undefined;
} = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
};

const _clientEnv = clientEnvSchema.safeParse(clientEnv);

const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value)
        return `${name}: ${value._errors.join(', ')}`;
    })
    .filter(Boolean);

if (_clientEnv.success === false) {
  console.error(
    'Invalid environment variables:',
    ...formatErrors(_clientEnv.error.format()),
  );
  throw new Error('Invalid environment variables');
}

export const env = _clientEnv.data;
