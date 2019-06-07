import Layout from '../components/layouts/Layout';
import fetch from 'isomorphic-unfetch';
import Products from './products';
import config from '../client-config';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

// Apollo GraphQL client
const client = new ApolloClient({
	link: createHttpLink({
		uri: config.graphqlUrl,
	}),
	cache: new InMemoryCache(),
});

const Index = () => {

	return (
		<ApolloProvider client={client}>
			<Layout>
				<Products />
			</Layout>
		</ApolloProvider>
	);
};

export default Index;

