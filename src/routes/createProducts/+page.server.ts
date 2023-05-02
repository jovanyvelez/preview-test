import { prisma } from '$lib/server/prisma';
import { productSchema } from '$lib/zodSchemas/productSchema.js';
import { fail } from '@sveltejs/kit';
import sharp from 'sharp';
import fs from 'fs-extra';
import { uploadImage } from '$lib/server/cloudinary';
//import type { Action, Actions } from './$types';
import { ZodError } from 'zod';
import type { Actions, Action } from '../$types.js';


export const load = async ({request}) => {

    const categories = await prisma.category.findMany({
        where:{padreId:null},

        select:{
            id:true,
            name:true,
            hijos:{
                select:{
                    id:true,
                    name:true,
                    hijos:{
                        select:{
                            id:true,
                            name:true,
                            hijos:true
                        }
                    }
                }          
            }
        }
    });
    
      await prisma.$disconnect();
      
      return { categories }
}

export const actions = {
	add: async ({request}) => {
		let formData = Object.fromEntries( await request.formData());
        /*formData = {
			...formData,
			quantity: Number(formData.quantity),
			price1: Number(formData.price1),
			price2: Number(formData.price2),
			price3: Number(formData.price3),
			promo: formData?.promo ? true : false,
			active: formData?.active ? true : false
		};*/

        try {
            const result = productSchema.parse({formData, quantity: Number(formData.quantity)});
            console.log(result)
        } catch (error: unknown) {
            if(error instanceof ZodError) {
                console.log(error.flatten());
			    const { fieldErrors: errors } = error.flatten();
			    const { imagen, ...data } = formData;
			    return fail(400, { data, errors });
            }
        }
	},

	delete: async ({ cookies, request }) => {
        const data = await request.formData();
	}
};