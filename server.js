const next = require( 'next' );
const express = require( 'express' );

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next( { dev } );
const handle = app.getRequestHandler();

require('dotenv').config();

const WooCommerceAPI = require( 'woocommerce-api' );
const WooCommerce = new WooCommerceAPI({
	url: process.env.SITE_URL,
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
