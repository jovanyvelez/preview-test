import { redirect, type Actions, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load = async ( ) => {

	//if (!user) throw redirect(302, '/adm/login');

	const rootCategories = await prisma.category.findMany({
		where: { padreId: null }
	});
	
	await prisma.$disconnect();
	return { main: rootCategories };
};
