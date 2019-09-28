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

/**
 * Login user Mutation query
 */
const REGISTER_USER = gql`
  mutation RegisterMyUser( $username: String! $email: String! $password: String!) {
    registerUser(input: {
      clientMutationId: "CreateUser"
      username: $username
      email: $email
      password: $password
    }) {
      user {
        id
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
const Register = () => {

	const [ username, setUsername ]         = useState( '' );
	const [ email, setEmail ]               = useState( '' );
	const [ password, setPassword ]         = useState( '' );
	const [ errorMessage, setErrorMessage ] = useState( '' );

	// Check if the user is validated already
	if ( process.browser ) {

		const userValidated = isUserValidated();

		if ( ! isEmpty( userValidated )  ) {
			Router.push( '/my-account' )
		}

	}

	/**
	 * Handles user login.
	 *
	 * @param {object} event Event Object.
	 * @param {object} login login function from mutation query.
	 * @return {void}
	 */
	const handleRegister = async ( event, registerUser ) => {

		if ( process.browser ) {

			event.preventDefault();
			console.warn( 'came', username, email, password );

			await registerUser( { variables: { username, email, password } } )
				.then( response => handleRegisterSuccess( response ) )
				.catch( err => {
					console.warn( 'myerr', err );
					handleRegisterFail( err.graphQLErrors[ 0 ].message )
				} );
		}

	};

	/**
	 * Handle Register Fail.
	 *
	 * Set the error message text and validated to false
	 *
	 * @param {String} err Error message received
	 * @return {void}
	 */
	const handleRegisterFail = ( err ) => {

		console.warn( 'err', err );

		const error = err.split( '_' ).join( ' ' ).toUpperCase();

		setErrorMessage( error );

	};

	/**
	 * Handle Register success.
	 *
	 * @param {String} err Error message received
	 * @return {void}
	 */
	const handleRegisterSuccess = ( response ) => {

		console.warn( response );

		// if ( response.data.login.authToken ) {
		//
		// 	// Set the authtoken and user id and username info in the localStorage.
		// 	localStorage.setItem( config.authTokenName, JSON.stringify( response.data.login ));
		//
		// 	// Set form fields to empty.
		// 	setErrorMessage( '' );
		// 	setUsername( '' );
		// 	setPassword( '' );
		//
		// 	// Send the user to MyAccount page.
		// 	Router.push('/login');
		//
		// }

	};

	return (
		<ApolloProvider client={ client }>
			<Layout>
				<Mutation mutation={ REGISTER_USER }>

					{ ( registerUser, { loading, error } ) => (

						<div className="container mt-5 pt-5" style={ { maxWidth: '600px' } }>

							{/* Title */ }
							<h2 className="mb-2">Register</h2>

							{/* Error Message */ }
							{ '' !== errorMessage ? (
								<MessageAlert
									message={ errorMessage }
									success={ false }
								/>
							) : '' }

							{/* Login Form */ }
							<form className="mt-1" onSubmit={ ( event ) => handleRegister( event, registerUser ) }>

								{/* Username */ }
								<div className="form-group">
									<label className="lead mt-1" htmlFor="username">Username</label>
									<input
										type="text"
										className="form-control"
										id="username"
										placeholder="Enter username"
										value={ username }
										onChange={ ( event ) => setUsername( event.target.value ) }
									/>
								</div>

								{/* Username */ }
								<div className="form-group">
									<label className="lead mt-1" htmlFor="email">Email</label>
									<input
										type="email"
										className="form-control"
										id="email"
										placeholder="Enter email"
										value={ email }
										onChange={ ( event ) => setEmail( event.target.value ) }
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
									<button className="btn btn-secondary" type="submit">Register</button>
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

export default Register;
