import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.SCHEMA_PATH,
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
        scalars: {
          DateTime: 'string',
        },
        namingConvention: {
          enumValues: 'keep',
        },
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};
export default config;
