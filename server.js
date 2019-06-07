const next = require( 'next' );
const express = require( 'express' );
const { createReadStream } = require('fs');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next( { dev } );
const handle = app.getRequestHandler();

app.prepare()
	.then( () => {
		const server = express();

		// For Service Worker Request
		server.get( '/service-worker.js', ( req, res ) => {
			res.setHeader('content-type', 'text/javascript');
			createReadStream('./service-worker.js').pipe(res);
		} );

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
