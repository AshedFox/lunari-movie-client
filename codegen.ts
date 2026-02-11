import type { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const schemaPath = process.env.SCHEMA_URL || './schema.graphql';

const config: CodegenConfig = {
  schema: schemaPath,
  documents: ['src/**/*.{tsx,ts,graphql}'],
  ignoreNoDocuments: true,
  generates: {
    './src/lib/graphql/generated/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
        dedupeFragments: true,
      },
      config: {
        skipTypename: true,
        namingConvention: {
          enumValues: 'keep',
        },
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};
export default config;
