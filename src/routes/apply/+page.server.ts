import { redirect, type Actions } from '@sveltejs/kit';
import type { Application } from '$lib/types';
import { readForm } from '$lib/formUtils';
import { pb } from '$lib/pocketbase';
import { HCAPTCHA_SECRET } from '$env/static/private';

export const actions: Actions = {
	submit: async ({ locals, request }) => {
		const data = readForm(await request.formData()) as Application;
		console.log(data);

		const valid = await fetch('https://hcaptcha.com/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `response=${data.hCaptchaToken}&secret=${HCAPTCHA_SECRET}`
		}).then((r) => r.json());

		console.log('is valid captcha', valid.success);

		if (!valid.success) {
			return {
				status: 400,
				body: {
					message: 'Invalid hCaptcha response'
				}
			};
		}

		try {
			const record = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phoneNumber: data.phoneNumber,
				message: data.message,
				resume: data.resume,
				linkedin: `https://linkedin.com/in/${data.linkedin}`
			};

			console.log('clean', record);
			const result = await pb.collection('applications').create(record);
			console.log('dbresult', result);
		} catch (e) {
			console.error(e);
			return {
				status: 500,
				body: {
					message: 'An error occurred while submitting the application'
				}
			};
		}

		return {
			status: 200,
			body: {
				message: 'Application submitted successfully'
			}
		};
	}
};
