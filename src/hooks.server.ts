import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	
	const response = await resolve(event);

	// Apply CORS header for API routes
	if (event.url.pathname.startsWith('/api/import')) {
		// Required for CORS to work
		if (event.request.method === 'OPTIONS') {
			return new Response(JSON.stringify({success:'Soporta CORS'}), {
				headers: {
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': '*'
				}
			});
		}
		response.headers.append('Access-Control-Allow-Origin', `*`);
		return response;
	}

	event.locals.auth = auth.handleRequest(event);
	return await resolve(event)

};
