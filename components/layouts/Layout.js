import { useEffect } from 'react';
import '../../styles/sass/styles.scss';
import '../../styles/vendor/bootstrap.min.css';
import Head from 'next/head';
import Header from "./Header";
import Footer from "./Footer";

const Layout = ( props ) => {

	useEffect( () => {
		// Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
		if ( 'serviceWorker' in navigator ) {

			/**
			 * Register Service Worker
			 * 'sw.js' is our service worker file
			 */
			navigator.serviceWorker.register( '/service-worker.js' )
				.then( ( res ) => {
					console.warn( `Sevice Worker Registered ${res.scope}` );
				} )
				.catch( err => console.warn( 'SW registration failed' + err ) )

		} else {
			console.warn( 'Service Workers not supported' );
		}

	}, [] );


	return (
		<div>
			<Head>
				<title>WP Decoupled</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"/>
				<link rel="manifest" href="/static/manifest/manifest.json" />
			</Head>
			<Header/>
			<div className="wd-content">
				{props.children}
			</div>
			<Footer/>
		</div>
	);
};

export default Layout;
