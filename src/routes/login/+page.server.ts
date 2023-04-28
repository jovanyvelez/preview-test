import {fail, redirect} from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

import type { Action, Actions } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

import { prisma } from '$lib/server/prisma';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

const newUserSchema = z.object({
    email: z.string().email().min(5),
    password: z.string().min(4)
})


export const load =async ( event ) => {
    const form = await superValidate(event, newUserSchema);
    return {form};
}

const login: Action = async ( { locals, cookies, request }  ) => {
    const form = await superValidate(request, newUserSchema);
    return { form };
}

export const actions: Actions = { login };