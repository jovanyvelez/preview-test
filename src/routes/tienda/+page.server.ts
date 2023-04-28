import { prisma } from '$lib/server/prisma';


export const load = async () => {


	const rootCategory = await prisma.category.findMany({
		where: { padreId: null },
		include: {
		  hijos: {
			include: {
			  hijos: {
				include: {
				  hijos: {
					// Continúa incluyendo hijos según la profundidad deseada
					include: {
					  product: {
						include: {
						  price: true,
						  image: true,
						},
					  },
					},
				  },
				  product: {
					include: {
					  price: true,
					  image: true,
					},
				  },
				},
			  },
			  product: {
				include: {
				  price: true,
				  image: true,
				},
			  },
			},
		  },
		  product: {
			include: {
			  price: true,
			  image: true,
			},
		  },
		},
		
	  });
	
	prisma.$disconnect();
	return { datos:rootCategory };
};
