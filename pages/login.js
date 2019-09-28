import Layout from "../components/layouts/Layout";
import { useState } from 'react';
import client from '../components/ApolloClient';
import { ApolloProvider } from 'react-apollo';
import { Mutation } from 'react-apollo';
import config from '../client-config';
import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation LoginUser($username: String! $password: String!) {
    login(input: {
      clientMutationId: "uniqueId"
      username: $username
      password: $password
    }) {
      authToken
      user {
        id
        userId
        name
      }
    }
  }
`;

const Login = () => {

	const [ username, setUsername ] = useState( '' );
	const [ password, setPassword ] = useState( '' );
	const [ validate, setValidate ] = useState( false );
	const [ error, setError ] = useState( '' );

	const  handleLogin = async (event, login) => {
		if ( process.browser ) {

			event.preventDefault();

			await login( { variables: { username, password } } )
				.then( response => handleLoginSuccess( response ) )
				.catch( err => handleLoginFail( err.graphQLErrors[ 0 ].message ) );
		}
	};

	const handleLoginFail = ( err ) => {
		const error = err.split('_').join(' ').toUpperCase();
		setValidate( false );
		console.warn( 'erro', error );
	};

	const handleLoginSuccess = ( response ) => {

		// localStorage.setItem( AUTH_TOKEN, JSON.stringify( response.data.login ));
		console.warn( 'hello', response.data );

		// this.props.history.push('/my-account');
	};

	return (
		<ApolloProvider client={ client }>
			<Layout>
				<Mutation mutation={ LOGIN_USER }>

					{ ( login, { loading, error } ) => (

						<div className="container mt-5 pt-5" style={{ maxWidth: '600px' }}>
							<h2>Login</h2>
							{/* Error Message */}
							{ error ? (
								<div className="alert alert-dismissible alert-light">
									<button type="button" className="close" data-dismiss="alert">&times;</button>
									<span>{ error }</span>
								</div>
							) : '' }
							<form className="mt-5" onSubmit={ ( event ) => handleLogin( event, login ) }>
								<div className="form-group">
									<label htmlFor="username-or-email">Username or email</label>
									<input
										type="text"
										className="form-control"
										id="username-or-email"
										placeholder="Enter username or email"
										value={ username }
										onChange={ ( event ) => setUsername( event.target.value ) }
									/>
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input
										type="password"
										className="form-control"
										id="password"
										placeholder="Enter password"
										value={ password }
										onChange={ ( event ) => setPassword( event.target.value ) }
									/>
								</div>

								<div className="form-group">
									<button className="btn btn-secondary" type="submit">Submit</button>
								</div>
							</form>
						</div>
					) }
				</Mutation>

			</Layout>
		</ApolloProvider>
	)
};

export default Login;
