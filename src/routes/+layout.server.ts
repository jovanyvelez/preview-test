
import { redirect, type Actions, fail } from '@sveltejs/kit';

export const load = async ( {locals} ) => {
    console.log('layouy')
    const { user } = await locals.auth.validateUser();
	return {user}	
};