workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
	new RegExp( 'https://tekskools.com' ),
	new workbox.strategies.StaleWhileRevalidate()
);

workbox.precaching.precacheAndRoute( self.__precacheManifest );
