import config from "../client-config";
import isEmpty from "../validator/isEmpty";
import Router from 'next/router';

/**
 * Check if user is logged in.
 *
 * @return {object} Auth Object containing token and user data, false on failure.
 */
export const isUserValidated = () => {

	let authTokenData = localStorage.getItem( config.authTokenName );
	let userLoggedInData = '';

	if ( ! isEmpty( authTokenData ) ) {

		authTokenData = JSON.parse( authTokenData );

		if ( ! isEmpty( authTokenData.authToken ) ) {
			userLoggedInData = authTokenData;
		}
	}

	return userLoggedInData;

};

/**
 * Logout the user.
 *
 * @param {string} urlToRedirect URL where user needs to be redirected after logout.
 *
 * @return {void}
 */
export const logoutUser = ( urlToRedirect ) => {

	// Set auth data value in localStorage to empty.
	localStorage.setItem( config.authTokenName, '' );

	// Redirect the user to the given url.
	Router.push( urlToRedirect );

};

