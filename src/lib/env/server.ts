import { ZodFormattedError } from 'zod';
import { serverEnvSchema } from './schema';

const _serverEnv = serverEnvSchema.safeParse(process.env);

const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value)
        return `${name}: ${value._errors.join(', ')}`;
    })
    .filter(Boolean);

if (_serverEnv.success === false) {
  console.error(
    'Invalid environment variables:',
    ...formatErrors(_serverEnv.error.format()),
  );
  throw new Error('Invalid environment variables');
}

export const env = { ..._serverEnv.data };
