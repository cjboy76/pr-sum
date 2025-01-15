import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `Bearer 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`,
          'User-Agent': 'Node'
        },
      },
    },
  ],
  // schema: 'schema.docs.graphql',
  documents: ['src/**/*.ts', 'src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'src/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    }
  },
};

export default config;