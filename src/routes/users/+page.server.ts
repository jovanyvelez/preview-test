import { superValidate } from 'sveltekit-superforms/server';
//import { newUserSchema } from '$lib/zodSchemas/schemas.js';



export const load = async ({request, locals})=>{

    //const form = await superValidate(PageServerLoadEvent.request, newUserSchema);

    return { datos: 'Hola Mundo' };

    
}