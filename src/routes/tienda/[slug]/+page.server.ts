import { prisma } from '$lib/server/prisma';

export async function load({ params, locals }) {
	type mQuery = {
		param: string;
		page: number;
	};

	let query: mQuery;
	let continuar = true;
	try {
		query = JSON.parse(params.slug);
	} catch (error) {
		if (params.slug === 'busqueda') continuar = false;
		query = { param: params.slug, page: 1 };
	}
	const { user } = await locals.auth.validateUser();
	let cliente;
	if (user) {
		cliente = await prisma.usuario.findMany({
			where: { email: user.email },
			select: {
				nombre: true,
				telefono: true,
				email: true,
				tipoDoc: true,
				numDoc: true,
				Departamento: true,
				Ciudad: true,
				direccion: true,
				role: { select: { name: true } }
			}
		});
	}

	if(!continuar){
		return {cliente}
	}
	const pageSize = 10;

	const resultado = await prisma.$queryRaw`
    WITH RECURSIVE CategoryHierarchy AS (
        SELECT "id", "name", "padreId", "id" AS rootId, 0 AS level
        FROM "Category"
        WHERE "padreId" = ${query.param}
        
        UNION ALL
        
        SELECT c."id", c."name", c."padreId", ch.rootId, ch.level + 1
        FROM "Category" c
        INNER JOIN CategoryHierarchy ch ON c."padreId" = ch."id"
    )
    SELECT 
        ch."id"
    FROM CategoryHierarchy ch
    ORDER BY ch.rootId, ch.level`;
	let categorias;
	if (resultado.length === 0) {
		categorias = [params.slug];
	} else {
		categorias = resultado.map((obj) => obj.id);
	}

	const products = await prisma.product.findMany({
		where: {
			categoryId: {
				in: categorias
			}
		},
		select: {
			id: true,
			name: true,
			quantity: true,
			price: {
				select: { price1: true }
			},

			image: {
				where: { name: 'main' },
				select: { secureUrl: true }
			}
		},
		skip: pageSize * (query.page - 1),
		take: pageSize
	});

	const count = await prisma.product.count({
		where: {
			categoryId: {
				in: categorias
			}
		}
	});

	prisma.$disconnect();

	return { products, query, page: query.page, pages: Math.ceil(count / pageSize), cliente };
}
