import { ApolloServer } from 'apollo-server-express';
import app from './app';
import config from './config';
import { createSchema } from './graphql/schema';
import { verifyJWTToken } from './utils/auth';

// Setup Apollo Server
export async function setupApolloServer() {
  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }): any => {
      // Get the token from the cookie
      const token = req.cookies?.auth_token || '';

      // Verify the token and extract user info
      let user = undefined;
      if (token) {
        const decoded = verifyJWTToken(token);
        if (decoded) {
          user = {
            id: decoded.userId,
            email: decoded.email,
          };
        }
      }

      return {
        req: req as any,
        res: res as any,
        user,
      };
    },
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
  server.applyMiddleware({
    app: app,
    path: '/graphql',
    cors: {
      origin: 'http://localhost:5173', // Updated client URL
      credentials: true, // Allow credentials (cookies)
    },
  });

  console.log(
    `🚀 GraphQL server ready at http://localhost:${config.port}${server.graphqlPath}`
  );
}
