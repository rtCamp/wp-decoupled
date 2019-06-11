const withCss = require( '@zeit/next-css' );
const path = require( 'path' );

const { withPlugins } = require('next-compose-plugins');
const withOffline = require('next-offline');
const withSass = require( '@zeit/next-sass' );

const workBoxOptions = {
	generateSw: false,
	workboxOpts: {
		swDest: "./service-worker.js",
		swSrc: path.join(__dirname, "./service-worker.js"),
		globPatterns: ['static/**/*'],
		globDirectory: '.'
	}
};

module.exports = withPlugins([
    [withOffline( workBoxOptions ), { dontAutoRegisterSw: true }],
    [withCss(withSass({ target: "serverless" }))],
], {
    target: "serverless"
});