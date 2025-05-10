import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnv } from 'vite'

const envConfig = {...loadEnv('DEV', process.cwd())};

const config: CodegenConfig = {
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `Bearer ${envConfig.VITE_GITHUB_TOKEN}`,
          'User-Agent': 'Node'
        },
      },
    },
  ],
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