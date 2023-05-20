import { redirect, type Actions, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

import { auth } from '$lib/server/lucia';


// Función recursiva para obtener los nombres de los productos
function obtenerNombresProductos(arr) {
	const nombres = [];
  
	arr.forEach(obj => {
	  if (obj.product && obj.product.length > 0) {
		obj.product.forEach(producto => {
		  nombres.push(producto);
		});
	  }
  
	  if (obj.hijos && obj.hijos.length > 0) {
		const hijosNombres = obtenerNombresProductos(obj.hijos);
		nombres.push(...hijosNombres);
	  }
	});
	if(nombres){
		return nombres
	}
	return undefined;
  }

  
  function obtenerNumeroAleatorio(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
  }


export const load = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(303, '/login');

	const rootCategories = await prisma.category.findMany({

		where: { padreId: null },
		select:{
			id:true,
			padre:true,
			name:true,
			
			hijos: {
				select:{
					padre:true,
					name:true,
					hijos:{
						select:{
							product:{
								select:{
									id:true,
									name:true,
									image:true
								}
							}
						}
					},
					product:{
						select:{
							id:true,
							name:true,
							image:true
						}
					}
				}
			},

			product:{
				select:{
					id:true,
					name:true,
					image:true
				}
			}
		}
	});


	const categorias = rootCategories.map(e =>{
		const tmp = obtenerNombresProductos([e]);
		let nuevoArreglo;
		if(tmp.length > 4){
			nuevoArreglo = Array.from({ length: 4 }, () => {
				const indice = obtenerNumeroAleatorio(0, tmp.length - 1);
				return tmp.splice(indice, 1)[0];
			});
		}else{
			return tmp;				
		}
		return nuevoArreglo;
	})

	const categories = rootCategories.map(e =>{
		const tmp = obtenerNombresProductos([e]);
		let nuevoArreglo;
		if(tmp.length > 4){
			nuevoArreglo = Array.from({ length: 4 }, () => {
				const indice = obtenerNumeroAleatorio(0, tmp.length - 1);
				return tmp.splice(indice, 1)[0];
			});
		}else{
			nuevoArreglo = tmp;			
		}
		//console.log(e);
		return {categoria:e.name, id:e.id, productos:nuevoArreglo};

	})
	
	//console.log(categories)

	await prisma.$disconnect();
	return { main: categories };
};

export const actions: Actions = {
	// signout
	default: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return {};
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		console.log('ingreso a desconectar');
	}
};
