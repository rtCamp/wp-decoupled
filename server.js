const next = require( 'next' );
const express = require( 'express' );
const { createReadStream } = require('fs');
const { join } = require( 'path' );
const { parse } = require('url');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next( { dev } );
const handle = app.getRequestHandler();

app.prepare()
	.then( () => {
		const server = express();

		/**
		 * Get All products
		 */
		server.get( '/getProducts', ( request, response ) => {

			// Get All Products
			WooCommerce.get('products', function(err, data, res) {
				response.json( JSON.parse(res) );
			});
		} );

		/**
		 * Get Product by Id
		 */
		server.get( '/getProduct/:id', ( request, response ) => {
			const productId = request.params.id;

			// Get Product by Id
			WooCommerce.get( `products/${productId}`, function(err, data, res) {
				response.json( JSON.parse(res) );
			});
		} );

		// For Service Worker Request
		server.get( '/service-worker.js', ( req, res ) => {
			const parsedUrl    = parse( req.url, true );
			const { pathname } = parsedUrl;
			const filePath     = join( __dirname, '.next', pathname );

			res.setHeader('content-type', 'text/javascript');

			app.serveStatic( req, res, filePath );
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
