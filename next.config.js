const { withPlugins } = require('next-compose-plugins');

const withCss = require( '@zeit/next-css' );
const withSass = require('@zeit/next-sass');


module.exports = withPlugins([
	[withCss(withSass())],
]);
