import Layout from "../components/layouts/Layout";
import { useState, useEffect } from 'react';
import { isUserValidated } from "../utils/auth-functions";
import isEmpty from "../validator/isEmpty";
import Router from 'next/router';

/**
 * MyAccount functional component.
 *
 * @return {object} MyAccount content.
 */
const MyAccount = () => {

	const [ showContent, setShowContent ] = useState( false );
	const [ userData, setUserData ] = useState( '' );

	useEffect( () => {

		const userValidatedData = isUserValidated();

		if ( ! isEmpty( userValidatedData )  ) {

			setUserData( userValidatedData );
			setShowContent( true )

		} else {

			// If user is not logged in send the user back to login page.
			Router.push( '/login' );
		}

	}, [] );

	return (
		<Layout>
			{/* Only Show Content if user is logged in */}
			{ showContent ? (
				<div className="container mt-5 wpd-my-account">
					<h4>My Account</h4>
					<div className="wpd-my-account-sidebar">
						<a className="wpd-my-account-sidebar__link" href="#dashboard"><i className="fa fa-fw fa-home"></i> Dashboard</a>
						<a className="wpd-my-account-sidebar__link" href="#orders"><i className="fa fa-fw fa-wrench"></i> Orders</a>
						<a className="wpd-my-account-sidebar__link" href="#addresses"><i className="fa fa-fw fa-user"></i> Addresesses</a>
						<a className="wpd-my-account-sidebar__link" href="#account-details"><i className="fa fa-fw fa-envelope"></i> Account Details</a>
					</div>

					<div className="wpd-my-account__main">
						<div id="dashboard">
							{ userData.user.nicename ? <h6>Howdy { userData.user.nicename }!</h6>: '' }
							<h5 className="mt-3">Account Details</h5>
							{ userData.user.email ? <p>Email: { userData.user.email }</p>: '' }
						</div>
					</div>
				</div>
			) : ''}
		</Layout>
	)
};

export default MyAccount;
