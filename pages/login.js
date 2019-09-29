import Layout from "../components/layouts/Layout";
import { useState } from 'react';
import client from '../components/ApolloClient';
import { ApolloProvider } from 'react-apollo';
import { Mutation } from 'react-apollo';
import config from '../client-config';
import gql from 'graphql-tag';
import MessageAlert from "../components/message-alert/MessageAlert";
import Loading from "../components/message-alert/Loading";
import Router from 'next/router';
import { isUserValidated } from "../utils/auth-functions";
import isEmpty from "../validator/isEmpty";
import Link from "next/link";

/**
 * Login user Mutation query
 */
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
        email
        nicename
      }
    }
  }
`;

/**
 * Login Functional Component
 *
 * @return {object} Login form.
 */
const Login = () => {

	const [ username, setUsername ]         = useState( '' );
	const [ password, setPassword ]         = useState( '' );
	const [ errorMessage, setErrorMessage ] = useState( '' );
	const [ showAlertBar, setShowAlertBar ] = useState( true );

	// Check if the user is validated already
	if ( process.browser ) {

		const userValidated = isUserValidated();

		if ( ! isEmpty( userValidated )  ) {
			Router.push( '/my-account' );
		}

	}

	/**
	 * Hide the Status bar on cross button block
	 */
	const onCloseButtonClick = () => {
		setShowAlertBar( false );
	};

	/**
	 * Handles user login.
	 *
	 * @param {object} event Event Object.
	 * @param {object} login login function from mutation query.
	 * @return {void}
	 */
	const handleLogin = async ( event, login ) => {

		if ( process.browser ) {

			event.preventDefault();

			await login( { variables: { username, password } } )
				.then( response => handleLoginSuccess( response ) )
				.catch( err => handleLoginFail( err.graphQLErrors[ 0 ].message ) );
		}

	};

	/**
	 * Handle Login Fail.
	 *
	 * Set the error message text and validated to false
	 *
	 * @param {String} err Error message received
	 * @return {void}
	 */
	const handleLoginFail = ( err ) => {

		const error = err.split( '_' ).join( ' ' ).toUpperCase();

		setErrorMessage( error );
		setShowAlertBar( true );

	};

	/**
	 * Handle Login success.
	 *
	 * @param {String} err Error message received
	 * @return {void}
	 */
	const handleLoginSuccess = ( response ) => {

		if ( response.data.login.authToken ) {

			// Set the authtoken and user id and username info in the localStorage.
			localStorage.setItem( config.authTokenName, JSON.stringify( response.data.login ));

			// Set form fields to empty.
			setErrorMessage( '' );
			setUsername( '' );
			setPassword( '' );

			// Send the user to MyAccount page.
			Router.push('/my-account');

		}

	};

	return (
		<ApolloProvider client={ client }>
			<Layout>
				<Mutation mutation={ LOGIN_USER }>

					{ ( login, { loading, error } ) => (

						<div className="container mt-5 pt-5" style={ { maxWidth: '600px' } }>

							{/* Title */ }
							<h2 className="mb-2">Login</h2>

							{/* Error Message */ }
							{ ( ( '' !== errorMessage ) ) ? (
								showAlertBar && (
									<MessageAlert
										message={ errorMessage }
										success={ false }
										onCloseButtonClick={ onCloseButtonClick }
									/>
								)
							) : '' }

							{/* Login Form */ }
							<form className="mt-1" onSubmit={ ( event ) => handleLogin( event, login ) }>

								{/* Username or email */ }
								<div className="form-group">
									<label className="lead mt-1" htmlFor="username-or-email">Username or
										email</label>
									<input
										type="text"
										className="form-control"
										id="username-or-email"
										placeholder="Enter username or email"
										value={ username }
										onChange={ ( event ) => setUsername( event.target.value ) }
									/>
								</div>

								{/* Password */ }
								<div className="form-group">
									<label className="lead mt-1" htmlFor="password">Password</label>
									<input
										type="password"
										className="form-control"
										id="password"
										placeholder="Enter password"
										value={ password }
										onChange={ ( event ) => setPassword( event.target.value ) }
									/>
								</div>

								{/* Submit Button */ }
								<div className="form-group">
									<button className="btn btn-primary" disabled={ loading ? 'disabled' : '' } type="submit">Login</button>
									<Link href="/register"><a className="btn btn-secondary ml-2">Register</a></Link>
								</div>

								{/*	Loading */ }
								{ loading ? <Loading message={ 'Processing...' }/> : '' }
							</form>
						</div>
					)

					}
				</Mutation>

			</Layout>
		</ApolloProvider>
	)
};

export default Login;
