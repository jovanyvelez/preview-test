import {fail, redirect} from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

import type { Action, Actions } from './$types';

import { LuciaError } from 'lucia-auth';



export const load =async ( {locals} ) => {
    
    console.log('En Load')
    const session = await locals.auth.validate();
    
    if(session) {
        throw redirect(302,'/');
    }else {
        return {  };
    }
}

const login: Action = async ( { request, locals }  ) => {
    const session = await locals.auth.validate();
    if(session) return{}
    console.log('en action')
    const form = await request.formData()
    const email = form.get('email');
    const password = form.get('password');
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        return fail(400, {
            message: 'Invalid input'
        });
    }

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
    console.log('Action retorna true')
    return {}
}

export const actions: Actions = { login };