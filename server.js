const next = require( 'next' );
const express = require( 'express' );
const { createReadStream } = require('fs');
const cookieParser = require( 'cookie-parser' );

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next( { dev } );
const handle = app.getRequestHandler();

app.prepare()
	.then( () => {
		const server = express();

		server.use(cookieParser());

		// server.get('/', function (req, res) {
		// 	// Cookies that have not been signed
		//
		// 	res.cookie("count", "1");
		// 	console.log('Cookies: ', req.cookies);
		//
		// 	// Cookies that have been signed
		// 	console.log('Signed Cookies: ', req.signedCookies);
		// 	return handle( req, res, '/' );
		// });

		// For Service Worker Request
		server.get( '/service-worker.js', ( req, res ) => {
			res.setHeader('content-type', 'text/javascript');
			createReadStream('./service-worker.js').pipe(res);
		} );

		server.get( '/manifest.json', ( req, res ) => {
			res.setHeader('content-type', 'text/javascript');
			createReadStream('./static/manifest/manifest.json').pipe(res);
		} );

		server.get( '/favicon.ico', ( req, res ) => {
			res.setHeader('content-type', 'text/javascript');
			createReadStream('./static/favicon.ico').pipe(res);
		} );

		// If user lands directly on the product page,
		// extract the product id from the url and handle
		// the request.
		server.get( '/product/:slug', ( req, res ) => {

			const actualPage = '/product';
			const productId = parseInt( req.params.slug.split('-').pop() );
			const queryParams = { id: productId };

			app.render(req, res, actualPage, queryParams);
		});

		server.get( '*', ( req, res ) => {
			return handle( req, res );
		} );

		server.listen( port, ( err ) => {
			if ( err ) {
				throw err;
			}
			console.warn( `Ready on http://localhost:${port}` );
		} );
	} );
