import { superValidate } from 'sveltekit-superforms/server';
import { createUserSchema } from '$lib/zodSchemas/schemas.js';



export const load = async ({request, locals})=>{

    const form = await superValidate(request, createUserSchema);
    return { form };

    
}