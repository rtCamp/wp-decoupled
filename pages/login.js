import Layout from '../src/components/layouts/Layout';
import { useState } from 'react';
import client from '../src/apollo/ApolloClient';
import { useMutation } from '@apollo/client';
import MessageAlert from '../src/components/message-alert/MessageAlert';
import Loading from '../src/components/message-alert/Loading';
import Router from 'next/router';
import { isUserValidated } from '../src/utils/auth-functions';
import isEmpty from '../src/validator/isEmpty';
import Link from 'next/link';
import validateAndSanitizeLoginForm from '../src/validator/login';
import { LOGIN_USER } from '../src/queries';
/**
 * Login functional component.
 *
 * @return {object} Login form.
 */
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlertBar, setShowAlertBar] = useState(true);

  // Check if the user is validated already.
  if (process.browser) {
    const userValidated = isUserValidated();

    // If user is already validated, redirect user to My Account page.
    if (!isEmpty(userValidated)) {
      Router.push('/my-account');
    }
  }

  /**
   * Hide the Status bar on cross button click.
   *
   * @return {void}
   */
  const onCloseButtonClick = () => {
    setShowAlertBar(false);
    setErrorMessage('');
  };

  /**
   * Handles user login.
   *
   * @param {object} event Event Object.
   * @param {object} login login function from login mutation query.
   * @return {void}
   */
  const handleLogin = async (event, login) => {
    if (process.browser) {
      event.preventDefault();

      // Validation and Sanitization.
      const validationResult = validateAndSanitizeLoginForm({
        username,
        password,
      });

      // If the data is valid.
      if (validationResult.isValid) {
        await login({
          variables: {
            username: validationResult.sanitizedData.username,
            password: validationResult.sanitizedData.password,
          },
        })
          .then((response) => handleLoginSuccess(response))
          .catch((err) => handleLoginFail(err.graphQLErrors[0].message));
      } else {
        setClientSideError(validationResult);
      }
    }
  };

  /**
   * Sets client side error.
   *
   * Sets error data to result received from our client side validation function,
   * and statusbar to true so that its visible to show the error.
   *
   * @param {Object} validationResult Validation Data result.
   */
  const setClientSideError = (validationResult) => {
    if (validationResult.errors.password) {
      setErrorMessage(validationResult.errors.password);
    }

    if (validationResult.errors.username) {
      setErrorMessage(validationResult.errors.username);
    }

    setShowAlertBar(true);
  };

  /**
   * Set server side error.
   *
   * Sets error data received as a response of our query from the server
   * and sets statusbar to true so that its visible to show our error.
   *
   * @param {String} error Error
   *
   * @return {void}
   */
  const setServerSideError = (error) => {
    setErrorMessage(error);
    setShowAlertBar(true);
  };

  /**
   * Handle Login Fail.
   *
   * Set the error message text and validated to false.
   *
   * @param {String} err Error message received
   * @return {void}
   */
  const handleLoginFail = (err) => {
    const error = err.split('_').join(' ').toUpperCase();

    setServerSideError(error);
  };

  /**
   * Handle Login success.
   *
   * @param {Object} response Response received
   *
   * @return {void}
   */
  const handleLoginSuccess = (response) => {
    if (response.data.login.authToken) {
      // Set the authtoken, user id and username in the localStorage.
      localStorage.setItem(
        process.env.RT_WP_DECOUPLED_USER_TOKEN,
        JSON.stringify(response.data.login)
      );

      // Set form field vaues to empty.
      setErrorMessage('');
      setUsername('');
      setPassword('');

      // Send the user to My Account page on successful login.
      Router.push('/my-account');
    }
  };

  const [login, { data: data, loading: loading, error: error }] = useMutation(
    LOGIN_USER,
    { client }
  );

  return (
    <Layout>
      <div className="wd-form container mt-5 pt-5">
        {/* Title */}
        <h2 className="mb-2">Login</h2>

        {/* Error Message */}
        {'' !== errorMessage
          ? showAlertBar && (
              <MessageAlert
                message={errorMessage}
                success={false}
                onCloseButtonClick={onCloseButtonClick}
              />
            )
          : ''}

        {/* Login Form */}
        <form className="mt-1" onSubmit={(event) => handleLogin(event, login)}>
          {/* Username or email */}
          <div className="form-group">
            <label className="lead mt-1" htmlFor="username-or-email">
              Username or email
            </label>
            <input
              type="text"
              className="form-control"
              id="username-or-email"
              placeholder="Enter username or email"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="lead mt-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button
              className="btn btn-primary"
              disabled={loading ? 'disabled' : ''}
              type="submit"
            >
              Login
            </button>
            <Link href="/register" className="btn btn-secondary ml-2">
              Register
            </Link>
          </div>

          {/*	Loading */}
          {loading ? <Loading message={'Processing...'} /> : ''}
        </form>
      </div>
    </Layout>
  );
};

export default Login;
