importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js');

// Cache version.
const cacheName = 'WNv3';

const store = new idbKeyval.Store('GraphQL-Cache', 'PostResponses');

/**
 * Paths for the files to be cached.
 *
 * There will be only one download of file on each route.
 * Once its downloaded, the page when that route is requested will be served from the cache
 *
 * @type {string[]}
 */
const cachedFiles = [
	'/',
	'/static/manifest/manifest.json',
	'/static/android-chrome-192x192.png',
	'/static/android-chrome-512x512.png',
	'/static/favicon.ico'
];

/**
 * We listen to the install event, When you register a SW , it gets registered and installed.
 * And when it gets installed, we cache the pages content.
 *
 * 'self' keyword refers to the current service worker
 * self.skipWaiting() allows it to skip waiting for the old service worker
 */
self.addEventListener( 'install', ( event ) => {

	// console.warn( 'Service Worker Installed' );

	/**
	 * Add the files to the cache
	 *
	 * event has a method called waitUntil, which takes a promise. In this case caches.open()
	 * The caches.open() takes the cache version as cacheName and returns the cache object in promise.
	 * This cache object has a method called addAll() which adds the files that you pass as param to the cache memory.
	 *
	 * Then we call self.skipWaiting() So that it does not wait for the previous version of the cache and goes the next one.
	 */
	event.waitUntil(
		caches.open( cacheName )
			.then( cache => {

				// console.warn( 'Caching Files');
				return cache.addAll( cachedFiles );

			} )
			.then( () => self.skipWaiting() )
			.catch( err => console.warn( err ) )
	);
});


/*
 * Check the global cache variable, If the new cache version is not the same as the old one delete the old cache
 * , when the SW is activated
 *
 */
self.addEventListener( 'activate', ( event ) => {

	// console.warn( 'Service Worker Activated' );

	/**
	 * Global cache object has a keys method that contains the previous cached items
	 */
	event.waitUntil(
		caches.keys()
			.then( keyList => {

				// console.warn( 'Check if there is a new cache version');

				// The Promise.all() will fail if any promise method inside of it fails
				return Promise.all( keyList.map( key => {
					if ( key !== cacheName ) {

						// console.warn( 'Deleting old Cached File with Key', key );

						// Delete that cache with that key
						return caches.delete( key );
					}
				} ) )

			} )
	);

	// This helps, service Worker claims all of the clients in the scope of the SW.
	// So that any further events apply to all the pages
	return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
	// console.log('Handling fetch event for', event.request.url);

	if (event.request.method === 'POST') {
		event.respondWith(staleWhileRevalidate(event));
	} else {
		event.respondWith(

			// Opens Cache objects that start with 'font'.
			caches.open(cacheName).then(function(cache) {
				return cache.match(event.request).then(function(response) {
					if (response) {
						return response;
					}

					// console.log('Fetching request from the network');

					return fetch(event.request).then(function(networkResponse) {
						cache.put(event.request, networkResponse.clone());

						return networkResponse;
					});
				}).catch(function(error) {

					// Handles exceptions that arise from match() or fetch().
					// console.error('Error in fetch handler:', error);

					throw error;
				});
			})
		);
	}
});

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
