import { ApolloServer } from 'apollo-server-express';
import app from './app';
import config from './config';
import { createSchema } from './graphql/schema';

// Setup Apollo Server
export async function setupApolloServer() {
  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }): any => ({
      req: req as any,
      res: res as any,
      user: undefined,
    }),
    formatError: (error) => {
      console.error('GraphQL Error:', error);

      // Don't expose internal server errors to clients
      if (error.message.startsWith('Internal server error')) {
        return new Error('Internal server error');
      }

      return error;
    },
  });

  await server.start();
  server.applyMiddleware({ app: app, path: '/graphql' });

  console.log(
    `🚀 GraphQL server ready at http://localhost:${config.port}${server.graphqlPath}`
  );
}
