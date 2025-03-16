import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Use a local schema file instead of a remote server
  schema: './src/types/schema.graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
};

export default config;
