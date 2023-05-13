
import { redirect, type Actions, fail } from '@sveltejs/kit';
import { redirect, type Actions, fail } from '@sveltejs/kit';

export const load = async ( {locals} ) => {
    const { user } = await locals.auth.validateUser();
	return {user}	
};

