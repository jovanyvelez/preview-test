import { prisma } from '$lib/server/prisma';
import { productSchema } from '$lib/zodSchemas/productSchema.js';
import sharp from 'sharp';
import fs from 'fs-extra';
import { uploadImage } from '$lib/server/cloudinary';
//import type { Action, Actions } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, Action } from '../$types.js';


export const load = async (event) => {
    const form = await superValidate(event, productSchema);
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
      
      return { form, categories }
}

export const actions = {
	create: async (event) => {
		//const data = await request.formData();
		//db.createTodo(cookies.get('userid'), data.get('description'));
        const form  = await superValidate(event, productSchema);
        return {form}
	},

	delete: async ({ cookies, request }) => {
        const data = await request.formData();
		//db.deleteTodo(cookies.get('userid'), data.get('id'));

	}
};