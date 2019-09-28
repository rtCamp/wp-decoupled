import Layout from "../components/layouts/Layout";
import { useState, useEffect } from 'react';
import { isUserValidated } from "../utils/auth-functions";
import isEmpty from "../validator/isEmpty";

const MyAccount = () => {

	const [ showContent, setShowContent ] = useState( false );
	const [ userData, setUserData ] = useState( '' );

	useEffect( () => {
		const userValidatedData = isUserValidated();

		if ( ! isEmpty( userValidatedData )  ) {

			setUserData( userValidatedData );
			setShowContent( true )
		}

	}, [] );
	
	console.warn( userData );

	return (
		<Layout>
			{/* Only Show Content if user is logged in */}
			{ showContent ? (
				<div className="container mt-5">
					<h4>My Account</h4>

				</div>
			) : ''}
		</Layout>
	)
};

export default MyAccount;
