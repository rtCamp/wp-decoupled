import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore'
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
    }
};

const cache = new InMemoryCache({
    resultCaching: false
});

const link = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_WOO_SITE_URL}/graphql`
});

export const middleware = new ApolloLink((operation, forward) => {

    let session;
    console.log("Middleware")
    if (typeof window !== "undefined") {
        console.warn("Middleware If")
        session = localStorage.getItem('woo-session');
    }
    if (session) {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          'woocommerce-session': `Session ${session}`,
        }
      }));
    }
  
    return forward(operation);
  });
  
export const afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const { response: { headers } } = context;
    const session = headers.get('woocommerce-session');
  console.log("Afterware")
  if (session) {
      if (typeof window !== "undefined") {
          if ( localStorage.getItem('woo-session') !== session ) {
              console.log("Afterware If")
              localStorage.setItem('woo-session', headers.get('woocommerce-session'));
          }
      }
    }

    return response;
  });
});
  
// Apollo GraphQL client.
const client = new ApolloClient({
    link: middleware.concat(afterware.concat(link)),
    cache,
    defaultOptions
});

export default client;
