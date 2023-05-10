import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const cache = new InMemoryCache({
  resultCaching: false,
});

const link = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_WOO_SITE_URL}/graphql`,
});

// Apollo GraphQL client.
const client = new ApolloClient({
  link,
  cache,
  defaultOptions,
  connectToDevTools: true,
});

export default client;
