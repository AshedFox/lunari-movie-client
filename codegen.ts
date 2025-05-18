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
          DateTime: {
            input: 'string',
            output: 'Date',
          },
        },
        namingConvention: {
          enumValues: 'keep',
        },
      },
    },
    './src/lib/apollo/date-type-policies.ts': {
      plugins: ['./scripts/date-type-policies-plugin.js'],
      config: {
        scalarName: 'DateTime',
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};
export default config;
