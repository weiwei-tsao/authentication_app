import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to your GraphQL server with credentials included
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
  credentials: 'include', // This will send cookies with every request
});

// Add any additional headers if needed, but we won't manually add auth tokens anymore
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // We no longer need to manually add the token here
      // The HTTP-only cookie will be automatically included with requests
    },
  };
});

// Create the Apollo Client instance
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
