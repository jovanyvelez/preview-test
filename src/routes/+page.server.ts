import { redirect, type Actions, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

import { auth } from '$lib/server/lucia';

export const load = async ( {locals}: { locals?: undefined | { auth: any } }  ) => {

	if(locals?.auth){
		const { user } = await locals.auth.validateUser();
		if (!user) throw redirect(303, '/login');
	}

	const rootCategories = await prisma.category.findMany({
		where: { padreId: null }
	});
	
	await prisma.$disconnect();
	return { main: rootCategories };
};

export const actions: Actions = {
	// signout
	default: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
	}
};
