/**
 * Service worker scripts.
 */

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
	new RegExp( 'https://tekskools.com' ),
	new workbox.strategies.StaleWhileRevalidate()
);

const preCacheFiles = self.__precacheManifest || [];

preCacheFiles.push( {
	url: '/',
} );

workbox.precaching.precacheAndRoute( preCacheFiles );
