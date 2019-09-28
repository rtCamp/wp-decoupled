import config from "../client-config";
import isEmpty from "../validator/isEmpty";

/**
 * Check if user is logged in.
 *
 * @return {object} Auth Object container token and user data, false on failure.
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
