import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	const response = await resolve(event);
		// Apply CORS header for API routes
	if (event.url.pathname.startsWith('api/import')) {
		// Required for CORS to work
		/**
		 * Cuando se realiza una solicitud HTTP con un método o un encabezado personalizado
		 * que no está permitido por la política de CORS, el navegador envía una solicitud
		 * Preflight OPTIONS al servidor para obtener permiso antes de enviar la solicitud real. 
		 * La solicitud Preflight OPTIONS incluye el método y los encabezados que se utilizarán en 
		 * la solicitud real, así como la dirección URL y el origen del sitio que realiza la solicitud.
		 */
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
	if (event.url.pathname.startsWith('api/department')) {
		return
	}

	if (event.url.pathname.startsWith('api/ciudad')) {
		return
	}
	
	return await resolve(event)


};
