import { auth } from '$lib/server/lucia';

export const load = async ({ locals }: { locals?: undefined | { auth: any } }) => {
	
    if (locals?.auth) {
		const { user } = await locals.auth.validateUser();
		return { user };
	}

	return { user:undefined };
};
