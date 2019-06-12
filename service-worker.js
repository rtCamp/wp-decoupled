/**
 * Service worker scripts.
 */

importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js');

const store = new idbKeyval.Store('GraphQL-Cache', 'PostResponses');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

self.addEventListener( 'fetch', function ( event ) {
	if ( event.request.method === 'POST' ) {
		event.waitUntil( event.respondWith( staleWhileRevalidate( event ) ) );
	}
} );

workbox.routing.registerRoute(
	new RegExp( 'https://tekskools.com' ),
	new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
	new RegExp( /\/product.+/ ),
	new workbox.strategies.StaleWhileRevalidate()
);

const preCacheFiles = self.__precacheManifest || [];

preCacheFiles.push( {
	url: '/',
} );

workbox.precaching.precacheAndRoute( preCacheFiles );


async function staleWhileRevalidate(event) {

	let cachedResponse = await getCache(event.request.clone());
	let fetchPromise = fetch(event.request.clone())
		.then((response) => {
			setCache(event.request.clone(), response.clone());
			return response;
		})
		.catch((err) => {
			console.error(err);
		});
	return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;
}

async function serializeResponse(response) {
	let serializedHeaders = {};
	for (var entry of response.headers.entries()) {
		serializedHeaders[entry[0]] = entry[1];
	}
	let serialized = {
		headers: serializedHeaders,
		status: response.status,
		statusText: response.statusText
	};
	serialized.body = await response.json();
	return serialized;
}

async function setCache(request, response) {

	let body = await request.json();
	let id = body.query.toString() + JSON.stringify( body.variables );

	var entry = {
		query: body.query,
		response: await serializeResponse(response),
		timestamp: Date.now()
	};
	idbKeyval.set(id, entry, store);
}

async function getCache(request) {
	let data;
	try {
		let body = await request.json();
		let id = body.query.toString() + JSON.stringify( body.variables );

		data = await idbKeyval.get(id, store);
		if (!data) return null;

		// Check cache max age.
		let cacheControl = request.headers.get('Cache-Control');
		let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
		if (Date.now() - data.timestamp > maxAge * 1000) {
			console.log(`Cache expired. Load from API endpoint.`);
			return null;
		}

		console.log(`Load response from cache.`);
		return new Response(JSON.stringify(data.response.body), data.response);
	} catch (err) {
		return null;
	}
}

