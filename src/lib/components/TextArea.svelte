<script lang="ts">
	import { buildDebouncer } from '$lib/utils';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	export let maxlength: number | undefined = undefined;
	export let lineClamp: number | undefined = undefined;
	export let resize = false;
	export let height: 'auto' | number = 'auto';
	export let showCounter = true;
	let typeValue: 'email' | 'text' | 'password' = 'text';
	export { typeValue as type };
	export let value = '';
	export let length = 0;
	export let placeholder = '';
	export let label = '';
	export let required = false;
	export let debounce = false;
	export let debouncetime = 500;
	export let valid = true;
	export let invalid = false;
	export let error = '';
	export let pattern = undefined;
	export let focus = false;
	export let name = '';

	export let autoValidate = false;
	export let validation = (value: string, required: boolean) => true;
	export let transform = (value: string) => value;

	let input: HTMLTextAreaElement | null = null;
	let buffer = value;

	$: invalid = !valid;

	$: setBuffer(value);

	function setBuffer(value: string) {
		buffer = value;
	}

	$: if (input !== null) {
		input.style.height =
			calculateHeight(parseInt(getComputedStyle(input).lineHeight), input?.clientHeight) + 'px';
	}

	$: {
		if (focus) {
			dispatch('focus', { value: buffer });
		} else {
			// set the scroll position to the top
			input?.scrollTo(0, 0);
			dispatch('blur', { value: buffer });
		}
	}

	$: if (!debounce) {
		checkValidity();
		value = transform(buffer);
	}

	$: if (debounce) debounceCallback(buffer);

	$: length = buffer.length;

	const debounceCallback = buildDebouncer((value) => {
		checkValidity();

		if (valid) {
			value = transform(buffer);
		}

		dispatch('debounce', { value: buffer });
	}, debouncetime);

	function checkValidity(submit = false) {
		if (autoValidate || submit) {
			if (required && buffer.length === 0) {
				valid = false;
				error = 'Required';
			} else {
				try {
					valid = validation(buffer);
				} catch (e) {
					valid = false;
					error = e.message;
				}
			}
		}

		if (valid) {
			error = '';
		}

		return valid;
	}

	function calculateHeight(lineHeight: number, currentHeight: number) {
		if (height !== 'auto') {
			return lineHeight * height;
		}

		if (lineClamp) {
			const maxHeight = lineHeight * lineClamp;
			return Math.min(currentHeight, maxHeight);
		}

		return Math.max(currentHeight, lineHeight);
	}

	function onChange(event: Event) {
		dispatch('input', event);

		valid = true;

		const target = event.target as HTMLTextAreaElement;
		const lineHeight = parseInt(getComputedStyle(input).lineHeight);
		const newHeight = calculateHeight(lineHeight, target.clientHeight);
		target.style.height = `${newHeight}px`;
	}

	onMount(() => {
		input.submit = submit;
	});

	// returns a boolean indicating whether the input is valid
	function submit() {
		return checkValidity(true);
	}
</script>

<div class="{$$restProps.class ?? ''} relative group" on:click={() => input?.focus()}>
	<label for={input} class="label">
		{#if label}
			<div class="flex justify-between items-center mb-1">
				<span class="text-surface-8 text-sm font-semibold"
					>{label}<span class="text-red-500">{required ? '*' : ''}</span>{error
						? ` - ${error}`
						: ''}</span
				>
			</div>
		{/if}
		<div
			class="area-style flex m-0 p-0 hover:cursor-text overflow-hidden"
			class:input-focus={focus}
			class:input-error={invalid}
		>
			<slot name="before" />
			<textarea
				bind:this={input}
				class:resize-none={!resize}
				class="text-surface-8 placeholder-surface-4 text-sm m-0 p-0 grow border-none bg-surface-0 bg-opacity-0 outline-none focus:ring-0"
				type="text"
				on:invalid
				on:focus={() => (focus = true)}
				on:blur={() => (focus = false)}
				on:click
				on:input
				on:change={onChange}
				bind:value={buffer}
				{maxlength}
				{placeholder}
				{pattern}
				{name}
				data-form-element="textarea"
			/>
			<slot name="after" />
		</div>
		{#if maxlength && showCounter}
			<div
				class:opacity-100={focus}
				class:opacity-0={!focus}
				class="text-xs text-right text-surface-3 absolute top-0.5 transition-opacity"
				class:right-2={label.length === 0}
				class:right-0={label.length > 0}
			>
				{length}/{maxlength}
			</div>
		{/if}
	</label>
</div>

<style>
	.area-style {
		@apply font-medium bg-surface-0/25 border border-surface-3 text-surface-10 text-sm rounded-lg ring-0 w-full p-2.5 transition-all hover:border-accent-5;
	}

	input {
		scroll-behavior: smooth;
	}

	.input-focus {
		@apply ring-2 ring-accent-5 border-accent-5 ring-opacity-50;
	}

	.resize-none {
		resize: none;
	}
</style>
