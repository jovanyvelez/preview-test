import { prisma } from '$lib/server/prisma';

async function getSubcategoryIds(categoryId: string): Promise<string[]> {
	
    const subcategories = await prisma.category.findMany({
		where: { padreId: categoryId },
		select: { id: true, product: true }
	});

	const subcategoryIds = subcategories.map((subcategory) => subcategory.id);

	const recursiveSubcategoryIds = await Promise.all(
		subcategories.map((subcategory) => getSubcategoryIds(subcategory.id))
	);

	const allSubcategoryIds = subcategoryIds.concat(...recursiveSubcategoryIds);

	return allSubcategoryIds;
}


//Funcion principal Ojo
export async function load({ params, locals }) {
	
    type mQuery = {
		param: string,
		page: number
	}
	
	let query: mQuery;
	try {
		query = JSON.parse(params.slug)
	} catch (error) {
		query = {param: params.slug, page:1}
	}

    const pageSize = 10;
    const subcategoryIds = await getSubcategoryIds(query.param);
	subcategoryIds.push(params.slug);
    
	const result = await Promise.all(
		subcategoryIds.map(async (categoryId) => {
			const count = await prisma.product.count({ where: { categoryId } });
			return count > 0 ? categoryId : null;
		})
	);

	const categorias = result.filter((categoryId) => categoryId != null) as string[];

	
	const products = await prisma.product.findMany({
		where: {
			categoryId: {
				in: categorias
			}
		},
		select: {
			id:true,
			name:true,
			price: {
				select:{price1:true}
			},
			image: {
				where: {name:'main'},
				select: {secureUrl: true}
			}
		},
        skip:pageSize*(query.page-1),
        take: pageSize
	});
    

    const count = await prisma.product.count({
		where: {
			categoryId: {
				in: categorias
			}
		},
	});

	const { user } = await locals.auth.validateUser();
	let cliente;
    if(user){
        cliente = await prisma.usuario.findMany({
            where:{email: user.email},
            select: {
                nombre          :true,
                telefono        :true,
                email           :true,
                tipoDoc         :true,
                numDoc          :true,
                Departamento    :true,
                Ciudad          :true,
                direccion       :true,
                role            : {select:{name:true}}
            }
        })
    }

    prisma.$disconnect();
	return {products,
            query, 
            page: query.page,
            pages: Math.ceil(count/pageSize),
			cliente
		};
}
