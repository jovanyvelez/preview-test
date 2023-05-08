import {fail, redirect} from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

import type { Action, Actions } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { LuciaError } from 'lucia-auth';


const newUserSchema = z.object({
    email: z.string().email().min(5),
    password: z.string().min(4)
})


export const load =async ( {request, locals}:{ locals?: undefined | { auth: any }, request?: any } ) => {
    const form = await superValidate(request, newUserSchema);
    let session
    if(locals?.auth){
        session = await locals?.auth.validate();
    }
    if(session) throw redirect(302,'/');
    return { form };
}

const login: Action = async ( { locals, request }  ) => {
    const form = await superValidate(request, newUserSchema);
    const { email, password } = form.data;
    try {
        const key = await auth.useKey('username', email, password);
        const session = await auth.createSession(key.userId);
        locals.auth.setSession(session);
    } catch (error) {
        if (
            error instanceof LuciaError &&
            (error.message === 'AUTH_INVALID_KEY_ID' || error.message === 'AUTH_INVALID_PASSWORD')
        ) {
            return fail(400, {
                message: 'Incorrect username or password.'
            });
        }
        // database connection error
        console.error(error);
        return fail(500, {
            message: 'Unknown error occurred'
        });
    }
    return { form, follow: true };
}

export const actions: Actions = { login };