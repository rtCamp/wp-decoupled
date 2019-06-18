import client from '../components/ApolloClient';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';

const LOGIN_USER = gql`
mutation LoginUser {
  login( input: {
    clientMutationId:"uniqueId"
    username: "mahvash.sayed"
    password: "#bu@IB8O@2"
  } ) {
    authToken
    user {
      id
      name
    }
  }
}
`;

const LOGIN_QUERY = gql`query {
					getViewer {
						id
						username
					}
				}`;

const Login = () => {
	return (
		<div>
			Login
		</div>
	)
};

Login.getInitialProps = async () => {

	const result = await client.query({
		query: LOGIN_QUERY
	});

	return {
		products: result.data.products.nodes,
	}
};

export default Login;
