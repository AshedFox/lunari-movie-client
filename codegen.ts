import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
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
