<script lang="ts">
	import { PUBLIC_HCAPTCHA_SITEKEY } from '$env/static/public';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	let captcha: HTMLDivElement;

	export let token = null;

	export let error = '';
	export let label = '';

	function checkValidity(submit: boolean = false) {
		if (token === null) {
			error = 'Please complete the captcha';
			return false;
		}
		error = '';
		if (submit) {
			dispatch('submit', { token });
		}
		return true;
	}

	function render() {
		console.log('rendering captcha');

		// create a looping function until the captcha is rendered
		const interval = setInterval(() => {
			if (typeof window.hcaptcha === 'undefined') return;
			clearInterval(interval);
			window.hcaptcha.render('captcha-1', {
				sitekey: PUBLIC_HCAPTCHA_SITEKEY,
				// on verify, call the onVerify function
				callback: 'onVerify',
				expiredCallback: 'errorCallback'
			});
		}, 100);
	}

	function update() {
		dispatch('update', { token });
	}

	onMount(() => {
		render();
		update();

		window.errorCallback = function () {
			dispatch('error');
			token = null;
			update();
		};

		window.onVerify = function (newToken) {
			dispatch('success', { token: newToken });
			token = newToken;
			update();
		};

		window.expiredCallback = function () {
			dispatch('expired');
			token = null;
			update();
		};

		captcha.submit = submit;
	});

	function submit() {
		return checkValidity(true);
	}
</script>

<svelte:head>
	<script src="https://js.hcaptcha.com/1/api.js?render=explicit" async defer></script>
</svelte:head>

<div class="{$$restProps.class ?? ''} relative group flex items-center">
	<label for={captcha} class="label">
		{#if label}
			<div class="flex justify-between items-center mb-1">
				<span class="text-surface-8 text-sm font-semibold"
					>{label}<span class="text-red-500">*</span>{error ? ` - ${error}` : ''}</span
				>
			</div>
		{/if}
		<div class="area-style flex m-0 p-0 hover:cursor-text overflow-hidden"></div>
		<div
			bind:this={captcha}
			id="captcha-1"
			class="h-captcha"
			data-form-element="captcha"
			data-callback="onVerify"
			data-expired-callback="expiredCallback"
			data-error-callback="errorCallback"
		></div>
	</label>
</div>
