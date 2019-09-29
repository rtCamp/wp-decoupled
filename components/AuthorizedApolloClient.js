
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import { isUserValidated } from "../utils/auth-functions";
import config from "../client-config";

const httpLink = new HttpLink({ uri: config.graphqlUrl });

const authLink = new ApolloLink((operation, forward) => {

	const tokenData = isUserValidated();

	// Retrieve the authorization token from local storage.
	const token = tokenData.authToken;

	console.warn( `Bearer ${token}` );

	// Use the setContext method to set the HTTP headers.
	operation.setContext({
		headers: {
			authorization: token ? `Bearer ${token}` : ''
		}
	});

	// Call the next link in the middleware chain.
	return forward(operation);
});

const authorizedClient = new ApolloClient({
	link: authLink.concat(httpLink), // Chain it with the HttpLink
	cache: new InMemoryCache()
});

export default authorizedClient;
