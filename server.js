const next = require( 'next' );
const express = require( 'express' );
const { createReadStream } = require('fs');
const { join } = require( 'path' );
const { parse } = require('url');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next( { dev } );
const handle = app.getRequestHandler();

require('dotenv').config();

const WooCommerceAPI = require( 'woocommerce-api' );
const WooCommerce = new WooCommerceAPI({
	url: process.env.WOO_SITE_URL,
	consumerKey: process.env.WOO_CONSUMER_KEY,
	consumerSecret: process.env.WOO_SECRET,
	wpAPI: true,
	version: 'wc/v3'
});

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
