<script lang="ts">
	import background from '$lib/deliciousmountain.png';
	import Logo from '$lib/components/Logo.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import FileArea from '$lib/components/FileArea.svelte';
	import Button from '$lib/components/Button.svelte';
	import { BinarySize } from '$lib/utils';
	import { onMount } from 'svelte';
	import type {BotProtectedApplication, DBJob} from '$lib/types';
	import { sendToServer } from '$lib/formUtils';
	import { linear } from 'svelte/easing';

	import { fade } from 'svelte/transition';
	import PageButtons from './PageButtons.svelte';
	import HCaptcha from '$lib/components/HCaptcha.svelte';
	import SelectInput from "$lib/components/SelectInput.svelte";
	import {BriefcaseIcon, MapPinIcon, Clock2Icon} from "lucide-svelte";

	export let data: {
		jobs: DBJob[];
		defaultJob: string;
	} = { jobs: [] };

	console.log(data);

	let inputs = [];
	let submitting = false;
	let selectedJob: DBJob | null = null;
	let message = '';
	let page = 1;

	let jobListings: {id: string, value: string}[] = [];
	let jobLocations: {id: string, value: string}[] = [];

	const pageManager = {
		page: 1,
		next() {
			pageManager.page++;
		},
		prev() {
			pageManager.page--;
		}
	};

	function phoneNumberFormatter(e: InputEvent) {
		const input = e.target as HTMLInputElement;
		const value = input.value.replace(/\D/g, '');
		const match = value.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
		if (match) {
			input.value = !match[2]
				? match[1]
				: `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
			// cap the length
			if (input.value.length > 14) {
				input.value = input.value.slice(0, 14);
			}
		}
	}

	function emailFormatter(e: InputEvent) {
		// make sure no spaces are allowed or invalid characters like , or ; or :
		const input = e.target as HTMLInputElement;
		input.value = input.value.replace(/[^a-zA-Z0-9@._-]/g, '');
	}

	const form: BotProtectedApplication = {
		jobId: '',
		location: '',
		fullTime: '',
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		linkedin: '',
		message: '',
		resume: null,
		hCaptchaToken: null
	};

	onMount(() => {
		// get every element inside the form WITH the data-form-element attribute
		inputs = Array.from(document.querySelectorAll('form [data-form-element]'));
		jobListings = data.jobs?.map((job) => ({ id: job.id, value: job.title })) ?? [];

		// get the ?id= query parameter from the URL
		const url = new URL(window.location.href);
		const id = url.searchParams.get('id');

		console.log(id, 'from url');

		form.jobId = jobListings.find((job) => job.id === id)?.id ?? '';
		updateSelectedJob({ detail: { value: form.jobId } });
	});

	function updateSelectedJob(e: CustomEvent) {
		const id = e.detail.value;
		selectedJob = data.jobs.find((job) => job.id === id);

		if (!selectedJob) {
			jobLocations = [];
			return;
		}

		jobLocations = selectedJob.expand.locations.map((loc) => ({ id: loc.id, value: loc.location }));
	}

	function backward() {
		page--;
	}

	async function onSubmit() {
		submitting = true;
		message = '';

		if (page === 5) {
			return;
		}

		console.log('checking form');
		console.log(form);

		inputs = Array.from(document.querySelectorAll('#form [data-form-element]'));
		// check if all inputs are valid
		const validList = inputs.map((input: HTMLInputElement) => input.submit());

		let valid = validList.every((v) => v);

		console.log(validList, valid);

		if (!valid) {
			// focus on the first invalid input
			const invalidInput = inputs.find((input: HTMLInputElement) => !input.submit());
			invalidInput.focus();
			submitting = false;
			return;
		}

		if (page !== 4) {
			page++;
			submitting = false;
			return;
		}

		console.log('submitting');
		// return;
		await sendToServer('?/submit', form).then((res) => {
			console.log(res);
			if (res.status === 200) {
				console.log('success');
				page++;
			} else {
				console.log('error');
				message = res.body.body.message;
			}
			submitting = false;
		});
	}
</script>

<div class="flex w-screen h-screen m-0 p-0 overflow-hidden" style="margin: 0; padding: 0;">
	<div class="shrink-0 h-screen pl-20 pr-36 py-20 overflow-y-scroll">
		<div class="grid grid-cols-3 px-5 gap-2 mb-8">
			{#each [['Select position', 1], ['About you', 2], ['Resume', 3]] as [stage, i]}
				<div class="col-span-1">
					<div
						class:border-accent-5={page >= i}
						class:border-surface-2={page < i}
						class="transition-all duration-200 rounded-full col-span-1 h-0 border-t-2 w-full"
					/>
					<p class="text-surface-7 mt-2">{stage}</p>
				</div>
			{/each}
		</div>
		<div id="form" class="flex flex-col gap-2 max-w-[34rem] w-screen px-5">
			{#if page === 1}
				<div
					in:fade={{ delay: 300, duration: 300, scale: 0.9, easing: linear }}
					out:fade={{ duration: 300, scale: 0.9, easing: linear }}
					class="flex flex-col gap-2"
				>
					<p class="text-surface-5 mb-1">Welcome. First things first...</p>
					<h1 class="text-2xl sm:text-3xl font-bold text-surface-9 mb-4">
						What job are you applying for?
					</h1>
					<SelectInput
					label="What are you applying for?"
					bind:value={form.jobId}
					required
					on:change={updateSelectedJob}
					options={jobListings} placeholder="Search open positions">
						<div slot="before" class="mr-2.5">
							<BriefcaseIcon class="w-[20px] h-[20px] aspect-square text-surface-6" />
						</div>
					</SelectInput>
					<SelectInput
							label="Select an office location, or choose remote"
							required
							disabled={form.jobId === ''}
							bind:value={form.location}
							options={jobLocations} placeholder="Search office locations">
						<div slot="before" class="mr-2.5">
							<MapPinIcon class="w-[20px] h-[20px] aspect-square text-surface-6" />
						</div>
					</SelectInput>
					<SelectInput
							label="Full time or part time?"
							required
							bind:value={form.fullTime}
							options={[
								{ id: 'true', value: 'Full time' },
								{ id: 'false', value: 'Part time' }
							]} placeholder="Select">
						<div slot="before" class="mr-2.5">
							<Clock2Icon class="w-[20px] h-[20px] aspect-square text-surface-6" />
						</div>
					</SelectInput>
					<PageButtons {onSubmit} page={1} bind:submitting on:backward={() => backward} />
				</div>
			{:else if page === 2}
				<div
					in:fade={{ delay: 300, duration: 300, easing: linear }}
					out:fade={{ duration: 300, easing: linear }}
					class="flex flex-col gap-2"
				>
					<div>
						<p class="text-surface-5 mb-1">Awesome. Now...</p>
						<h1 class="text-2xl sm:text-3xl font-bold text-surface-9 mb-4">
							Tell us a bit about yourself
						</h1>
					</div>
					<div class="grid grid-cols-2 gap-2">
						<TextInput
							name="first"
							bind:value={form.firstName}
							showCounter={false}
							class="col-span-1 w-full"
							maxlength={100}
							label="First Name"
							placeholder="John"
							required
						/>
						<TextInput
							name="last"
							bind:value={form.lastName}
							showCounter={false}
							class="col-span-1 w-full"
							maxlength={100}
							label="Last Name"
							placeholder="Doe"
							required
						/>
					</div>
					<TextInput
						name="email"
						bind:value={form.email}
						maxlength={320}
						label="Email"
						formType="email"
						showCounter={false}
						placeholder="johndoe@mail.co"
						required
						on:input={emailFormatter}
						validation={(value) => {
							// check if it maches the email regex
							const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
							if (!emailRegex.test(value)) {
								throw new Error('Invalid email');
							}
							return true;
						}}
					/>
					<TextInput
						name="phone"
						bind:value={form.phoneNumber}
						maxlength={14}
						label="Phone Number"
						formType="tel"
						showCounter={false}
						placeholder="(123) 456-7890"
						required
						on:input={phoneNumberFormatter}
						validation={(value) => {
							// check if it maches the phone number regex
							const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
							if (!phoneRegex.test(value)) {
								throw new Error('Invalid phone number');
							}
							return true;
						}}
					/>
					<TextInput
						bind:value={form.linkedin}
						maxlength={30}
						label="LinkedIn Profile"
						placeholder="john-doe"
					>
						<div slot="before">
							<p class="whitespace-nowrap text-surface-8 shrink-0">https://linkedin.com/in/</p>
						</div>
					</TextInput>
					<PageButtons {onSubmit} page={2} bind:submitting backward={() => page--} />
				</div>
			{:else if page === 3}
				<div
					in:fade={{ delay: 300, duration: 300, scale: 0.9, easing: linear }}
					out:fade={{ duration: 300, scale: 0.9, easing: linear }}
					class="flex flex-col gap-3"
				>
					<div>
						<p class="text-surface-5 mb-1">Great! Only one step left...</p>
						<h1 class="text-2xl sm:text-3xl font-bold text-surface-9 mb-4">
							Show us what makes you great
						</h1>
					</div>
					<TextArea
						bind:value={form.message}
						label="Anything else you'd like to add?"
						height={3}
						maxlength={200}
						resize={false}
						placeholder="I'm a great fit for this position because..."
						transform={(value) => value.trim()}
					/>
					<FileArea
						bind:value={form.resume}
						startingFiles={[form.resume]}
						label="Resume"
						accept="application/pdf"
						required
						subtext="Max. file size: 512KB"
						maxsize={10}
						transform={(file) => {
							console.log(file.name);

							if (!file.type.includes('pdf')) {
								console.log('invalid file type');
								throw new Error('File must be a PDF');
							}

							if (file.size > BinarySize.fromMegabytes(0.5).bytes) {
								throw new Error('File is too large');
							}

							return file;
						}}
					/>
					<PageButtons
						bind:token={form.hCaptchaToken}
						page={3}
						bind:submitting
						{onSubmit}
						backward={() => page--}
					/>
				</div>
			{:else if page === 4}
				<div
					in:fade={{ delay: 300, duration: 300, scale: 0.9, easing: linear }}
					out:fade={{ duration: 300, scale: 0.9, easing: linear }}
					class="flex flex-col gap-3"
				>
					<div>
						<p class="text-surface-5 mb-1">Just one last thing...</p>
						<h1 class="text-2xl sm:text-3xl font-bold text-surface-9 mb-4">
							Verify you're not a robot
						</h1>
					</div>
					<HCaptcha label="CAPTCHA" on:update={(e) => (form.hCaptchaToken = e.detail.token)} />
					{#if message}
						<div class="w-full p-2">
							{message}
						</div>
					{/if}
					<PageButtons {onSubmit} page={4} bind:submitting backward={() => page--} />
				</div>
			{:else if page === 5}
				<div
					in:fade={{ delay: 300, duration: 300, scale: 0.9, easing: linear }}
					out:fade={{ duration: 300, scale: 0.9, easing: linear }}
					class="flex flex-col gap-3"
				>
					<div>
						<p class="text-surface-5 mb-1">Thanks!</p>
						<h1 class="text-2xl sm:text-3xl font-bold text-surface-9 mb-4">
							Your application has been submitted
						</h1>
						<p class="text-surface-7">
							We'll be in touch soon. In the meantime, feel free to check out our other open
							positions.
						</p>
					</div>
					<Button type="submit" class="w-full" link="/" label="Great! Return home" />
				</div>
			{/if}
		</div>
	</div>
	<div
		style="padding: 0; margin: 0; background-position: center; background-size: cover; flex-grow: 1; height: 100vh; background-image: url({background});"
	>
		<Logo text="light" icon="white" link="/" class="h-12 m-10 md:block hidden" />
	</div>
</div>
