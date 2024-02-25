import { redirect, type Actions } from '@sveltejs/kit';
import type {application} from "$lib/types";
import {readForm} from "$lib/formUtils";

export const actions: Actions = {
    submit: async({locals, request}) => {
        const data = readForm(await request.formData()) as application;
        console.log(data?.resume?.name);

        return {
            status: 200,
            body: {
                message: "Application submitted successfully"
            }
        };
    }
}