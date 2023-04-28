import type { Actions } from '@sveltejs/kit';

import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';

export const load = async ( ) => {
	//todo
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {

		const session = await locals.auth.validate();
		if (session) throw redirect(302, '/');

		throw redirect(307, '/login');
		
	}
};
