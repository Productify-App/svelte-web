<script lang="ts">
	import background from '$lib/deliciousmountain.png';
	import Logo from "$lib/components/Logo.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import TextArea from "$lib/components/TextArea.svelte";
	import FileArea from "$lib/components/FileArea.svelte";
	import {MailIcon} from "lucide-svelte";
	import Button from "$lib/components/Button.svelte";

	function phoneNumberFormatter(e: InputEvent) {
		const input = e.target as HTMLInputElement;
		const value = input.value.replace(/\D/g, '');
		const match = value.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
		if (match) {
			input.value = !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
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

	const form: {
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		linkedin: string;
		message: string;
		resume: File;
	} = {
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		linkedin: '',
		message: '',
		resume: null,
	};
</script>

<div class="flex w-screen h-screen m-0 p-0 overflow-hidden" style="margin: 0; padding: 0;">
	<div class="max-w-[30rem] w-full shrink-0 h-screen p-10 overflow-y-scroll">
		<form class="flex flex-col gap-3">
			<Logo text="dark" link="/" class="h-12 md:hidden" />
			<h1 class="text-2xl sm:text-3xl font-bold text-surface-9">Apply for this position</h1>
			<p class="text-surface-5 text-sm mb-4">
				We are looking for a talented individual to join our team. If you are interested in this position, please fill out the form below and attach your resume.
			</p>
			<div class="grid grid-cols-2 gap-3">
				<TextInput bind:value={form.firstName} showCounter={false} class="col-span-1" maxlength={100} label="First Name" placeholder="John" required />
				<TextInput bind:value={form.lastName} showCounter={false} class="col-span-1" maxlength={100} label="Last Name" placeholder="Doe" required />
			</div>
			<TextInput bind:value={form.email} maxlength={320} label="Email" showCounter={false} placeholder="johndoe@mail.co" required on:input={emailFormatter} />
			<TextInput bind:value={form.phoneNumber} maxlength={14} label="Phone Number" showCounter={false} placeholder="(123) 456-7890" required on:input={phoneNumberFormatter} />
			<TextInput bind:value={form.linkedin} maxlength={30} label="LinkedIn Profile" placeholder="john-doe">
				<div slot="before">
					<p class="whitespace-nowrap text-surface-8 shrink-0">https://linkedin.com/in/</p>
				</div>
			</TextInput>
			<TextArea bind:value={form.message} label="Anything else you'd like to add?" height={2} maxlength={200} resize={false} placeholder="I'm a great fit for this position because..." transform={(value) => value.trim()} />
			<FileArea bind:value={form.resume} label="Resume" accept="application/pdf" required subtext="Max. file size: 10MB" maxsize={10}
				  transform={(file) => {
					  console.log(file);

					  if (!file.type.includes('pdf')) {
						  console.log("invalid file type");
						  throw new Error('File must be a PDF');
					  }

					  if (file.size > 10 * 1024 * 1024) {
						  throw new Error('File is too large');
					  }

					  return file;
				}}
			/>
			<Button label="Submit application" size="lg" />
		</form>
	</div>
	<div
		style="padding: 0; margin: 0; background-position: center; background-size: cover; flex-grow: 1; height: 100vh; background-image: url({background});"
	>
		<Logo text="light" icon="white" link="/" class="h-12 m-10 md:block hidden" />
	</div>
</div>
