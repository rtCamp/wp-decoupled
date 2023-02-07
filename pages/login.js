import axios from 'axios';
import * as https from 'https';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import Layout from '../src/components/layouts/Layout';
import Loading from '../src/components/message-alert/Loading';
import MessageAlert from '../src/components/message-alert/MessageAlert';
import { isUserValidated } from '../src/utils/auth-functions';
import isEmpty from '../src/validator/isEmpty';
import validateAndSanitizeLoginForm from '../src/validator/login';

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

    const [loggingIn, setLoggingIn] = useState(false);

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
    const handleLogin = async (event) => {
        if (process.browser) {
            event.preventDefault();
            setLoggingIn(true);

            // Validation and Sanitization.
            const validationResult = validateAndSanitizeLoginForm({ username, password });

            // If the data is valid.
            if (validationResult.isValid) {
                try {
                    const response = await axios({
                        method: 'POST',
                        url:
                            process.env.NEXT_PUBLIC_SITE_URL +
                            '/api/login/' +
                            `?username=${validationResult.sanitizedData.username}&password=${validationResult.sanitizedData.password}`,
                        httpsAgent: new https.Agent({
                            rejectUnauthorized: false
                        })
                    });
                    handleLoginSuccess(response);
                } catch (error) {
                    handleLoginFail(error.response.data);
                }
            } else {
                setClientSideError(validationResult);
            }
            setLoggingIn(false);
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
        const error = err.code.replace('[jwt_auth]', '').split('_').join(' ').toUpperCase();

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
        if (response?.data?.token) {
            // Set the authtoken, user id and username in the localStorage.
            localStorage.setItem(
                process.env.NEXT_PUBLIC_RT_WP_DECOUPLED_USER_DATA,
                JSON.stringify(response?.data)
            );

            // Set form field vaues to empty.
            setErrorMessage('');
            setUsername('');
            setPassword('');

            // Send the user to My Account page on successful login.
            Router.push('/my-account');
        }
    };

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
                <form className="mt-1" onSubmit={(event) => handleLogin(event)}>
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
                            disabled={loggingIn ? 'disabled' : ''}
                            type="submit">
                            Login
                        </button>
                        <Link className="btn btn-secondary ml-2" href="/register">
                            Register
                        </Link>
                    </div>

                    {/*	Loading */}
                    {loggingIn ? <Loading message={'Processing...'} /> : ''}
                </form>
            </div>
        </Layout>
    );
};

export default Login;
