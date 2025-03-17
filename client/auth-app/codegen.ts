import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // Use a local schema file instead of a remote server
  schema: './src/graphql/schema.graphql',
  documents: ['src/graphql/documents/**/*.graphql'],
  generates: {
    './src/graphql/generated/types.ts': {
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
