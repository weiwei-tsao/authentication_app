import { ApolloServer } from 'apollo-server-express';
import { buildGraphQLSchema } from 'graphql/graphqlSchema';

// Setup Apollo Server
async function setupApolloServer() {
  const schema = await buildGraphQLSchema();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }): Context => ({
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
  server.applyMiddleware({ app: app as any, path: '/graphql' });

  console.log(
    `🚀 GraphQL server ready at http://localhost:${process.env.PORT || 5001}${
      server.graphqlPath
    }`
  );
}
