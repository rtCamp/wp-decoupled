import Layout from "../components/layouts/Layout";
import { useState } from 'react';
import client from '../components/ApolloClient';
import { ApolloProvider } from 'react-apollo';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import MessageAlert from "../components/message-alert/MessageAlert";
import Loading from "../components/message-alert/Loading";
import Router from 'next/router';
import { isUserValidated } from "../utils/auth-functions";
import isEmpty from "../validator/isEmpty";
import Link from "next/link";
import validateAndSanitizeRegisterForm from "../validator/register";

/**
 * Register user mutation query.
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
 * Register Functional Component.
 *
 * @return {object} Register form.
 */
const Register = () => {

	const [ username, setUsername ]         = useState( '' );
	const [ email, setEmail ]               = useState( '' );
	const [ password, setPassword ]         = useState( '' );
	const [ errorMessage, setErrorMessage ] = useState( '' );
	const [ successMessage, setSuccessMessage ] = useState( '' );
	const [ showAlertBar, setShowAlertBar ] = useState( true );

	// Check if the user is validated already.
	if ( process.browser ) {

		const userValidated = isUserValidated();

		// Redirect the user to My Account page if user is already validated.
		if ( ! isEmpty( userValidated )  ) {
			Router.push( '/my-account' )
		}

	}

	/**
	 * Hide the Status bar on cross button click.
	 */
	const onCloseButtonClick = () => {
		setErrorMessage( '' );
		setShowAlertBar( false );
	};

	/**
	 * Sets client side error.
	 *
	 * Sets error data to result of our client side validation,
	 * and statusbars to true so that its visible.
	 *
	 * @param {Object} validationResult Validation result data.
	 */
	const setClientSideError = ( validationResult ) => {

		if( validationResult.errors.password ) {
			setErrorMessage( validationResult.errors.password );
		}

		if( validationResult.errors.email ) {
			setErrorMessage( validationResult.errors.email );
		}

		if( validationResult.errors.username ) {
			setErrorMessage( validationResult.errors.username );
		}

		setShowAlertBar( true );

	};

	/**
	 * Set server side error.
	 *
	 * Sets error data received as a response of our query from the server
	 * and set statusbar to true so that its visible.
	 *
	 * @param {String} error Error
	 *
	 * @return {void}
	 */
	const setServerSideError = ( error ) => {
		setErrorMessage( error );
		setShowAlertBar( true );
	};

	/**
	 * Handles user registration.
	 *
	 * @param {object} event Event Object.
	 * @param {object} registerUser registerUser function from REGISTER_USER mutation query.
	 * @return {void}
	 */
	const handleRegister = async ( event, registerUser ) => {

		if ( process.browser ) {

			event.preventDefault();

			// Validation and Sanitization.
			const validationResult = validateAndSanitizeRegisterForm( { username, email, password } );

			// If the data is valid.
			if ( validationResult.isValid ) {

				await registerUser( {
					variables: {
						username: validationResult.sanitizedData.username,
						email: validationResult.sanitizedData.email,
						password: validationResult.sanitizedData.password
					}
				} )
					.then( response => handleRegisterSuccess( response ) )
					.catch( err => handleRegisterFail( err.graphQLErrors[ 0 ].message ) );

			} else {

				setClientSideError( validationResult );

			}

		}

	};

	/**
	 * Handle Registration Fail.
	 *
	 * Set the error message text and validated to false.
	 *
	 * @param {String} err Error message received
	 * @return {void}
	 */
	const handleRegisterFail = ( err ) => {

		const error = err.split( '_' ).join( ' ' ).toUpperCase();

		setServerSideError( error );

	};

	/**
	 * Handle Register success.
	 *
	 * @param {Object} response Response received.
	 * @return {void}
	 */
	const handleRegisterSuccess = ( response ) => {

		if ( response.data.registerUser.user.email ) {

			// Set form fields value to empty.
			setErrorMessage( '' );
			setUsername( '' );
			setPassword( '' );

			localStorage.setItem( 'registration-success', 'yes' );

			// Add a message.
			setSuccessMessage( 'Registration Successful! . You will be redirected to login page now...' );

			setTimeout( () => {

				// Send the user to Login page.
				Router.push('/login?registered=true');

			}, 3000 );

		}

	};

	return (
		<ApolloProvider client={ client }>
			<Layout>
				<Mutation mutation={ REGISTER_USER }>

					{ ( registerUser, { loading, error } ) => (

						<div className="wd-form container mt-5 pt-5">

							{/* Title */ }
							<h2 className="mb-2">Register</h2>

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

							{ ( ( '' !== successMessage ) ) ? (
								showAlertBar && (
									<MessageAlert
										message={ successMessage }
										success={ true }
										onCloseButtonClick={ onCloseButtonClick }
									/>
								)
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
									<button className="btn btn-primary" disabled={ loading ? 'disabled' : '' } type="submit">Register</button>
									<Link href="/login"><a className="btn btn-secondary ml-2">Login</a></Link>
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
