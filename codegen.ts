import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  documents: ['src/**/*.{tsx,ts,graphql}'],
  ignoreNoDocuments: true,
  generates: {
    './src/lib/graphql/generated/': {
      preset: 'client',
      config: {
        skipTypename: true,
        dedupeFragments: true,
        scalars: {
          DateTime: 'Date',
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
