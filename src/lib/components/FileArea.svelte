<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { Check, PlusIcon, UploadIcon } from 'lucide-svelte';
	import { scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { BinarySize, dragAndDropFiles, ellipsisInTheMiddle } from '$lib/utils';

	const dispatch = createEventDispatcher();

	export { typeValue as type };
	export let multiple = false;
	export let files: File[] = [];
	export let length = 0;
	export let value = null;
	export let label = '';
	export let accept = '';
	export let subtext = '';
	export let required = false;
	export let valid = true;
	export let invalid = false;
	export let error = '';
	export let focus = false;

	export let transform = multiple ? (value: File[]) => value : (value: File) => value;

	let dragover = false;
	let unfilteredFiles: File[] | null = files;
	let isDragAndDropSupported = false;
	let input: HTMLInputElement | null = null;
	let dragOverArea: HTMLElement | null = null;

	$: {
		if (focus) {
			dispatch('focus', { value: files });
		} else {
			dispatch('blur', { value: files });
		}
	}

	$: transformUnfilteredFiles(unfilteredFiles);

	$: if (!multiple) value = files.length ? files[0] : null;

	$: {
		unfilteredFiles;
		onChange();
	}

	$: {
		valid;
		onInvalid();
	}

	// events
	function onInvalid(e: InputEvent) {
		if (!valid) {
			dispatch('invalid', e);
		}
	}

	function onChange() {
		if (multiple && unfilteredFiles.length) {
			dispatch('change', { value: unfilteredFiles });
		} else if (unfilteredFiles.length) {
			dispatch('change', { value: unfilteredFiles[0] });
		} else {
			dispatch('change', { value: null });
		}
	}

	function onInput(e: InputEvent) {
		checkValidity();

		if (valid) {
			dispatch('input', e);
		}
	}

	// transform
	function transformUnfilteredFiles(unfilteredFiles: File[]) {
		try {
			if (multiple) {
				files = transform(unfilteredFiles);
			} else if (unfilteredFiles?.length) {
				files = [transform(unfilteredFiles[0])];
			} else {
				files = [];
			}
			error = '';
			valid = true;
		} catch (e) {
			if (unfilteredFiles?.length) {
				unfilteredFiles = [];
			}
			files = [];
			valid = false;
			error = e.message;
		}
	}

	function handleFilesUpload(files: File[]) {
		for (const file of files) {
			if (multiple) {
				unfilteredFiles = [...unfilteredFiles, file];
			} else {
				unfilteredFiles = [file];
			}
		}
	}

	function checkValidity() {
		if (required && !files.length) {
			valid = false;
			error = 'This field is required';
		} else {
			valid = true;
			error = '';
		}
		return valid;
	}

	onMount(() => {
		isDragAndDropSupported =
			'draggable' in document.createElement('div') &&
			'ondragstart' in document.createElement('div') &&
			'ondrop' in document.createElement('div');

		if (!isDragAndDropSupported) {
			console.warn('Drag and drop files is not supported in this browser');
			return;
		}

		dragAndDropFiles(dragOverArea, handleFilesUpload, (hovering) => {
			dragover = hovering;
		});

		input.submit = submit;
	});

	function submit() {
		return checkValidity(true);
	}
</script>

<div
	bind:this={dragOverArea}
	class="{$$restProps.class ?? ''} relative group"
	on:click={() => input?.focus()}
>
	<label for={label} class="label">
		{#if label}
			<div class="flex justify-between items-center">
				<span class="text-surface-8 text-sm font-semibold"
					>{label}<span class="text-red-500">{required ? '*' : ''}</span></span
				>
			</div>
		{/if}
		<div class:dragover class="area-style hover:cursor-pointer" class:area-error={!valid}>
			<div
				class:button-focus={focus}
				class="button hover:border-accent-5 bg-surface-0/25 transition-all rounded-full border border-surface-2 p-4 mb-1"
			>
				{#if value}
					<div in:scale={{ duration: 300, delay: 300, opacity: 0.5, easing: cubicOut }}>
						<Check class="text-accent-5 h-6 w-6" />
					</div>
				{:else if dragover}
					<div in:scale={{ duration: 300, delay: 300, opacity: 0.5, easing: cubicOut }}>
						<PlusIcon class="text-accent-5 h-6 w-6" />
					</div>
				{:else}
					<div in:scale={{ duration: 300, delay: 300, opacity: 0.5, easing: cubicOut }}>
						<UploadIcon class="text-accent-5 h-6 w-6" />
					</div>
				{/if}
			</div>
			{#if value}
				<p class="text-surface-8 p">
					{ellipsisInTheMiddle(value.name, 35)}
					<span class="text-surface-5">({BinarySize.fromBytes(value.size).toString()})</span>
				</p>
			{:else if error}
				<p class="text-red-500 p">{error}</p>
			{:else}
				<p class="text-surface-8 p">
					<span class="text-accent-5 font-semibold">Select a file</span>
					<span class:hide={!isDragAndDropSupported}>or drag and drop one.</span>
				</p>
			{/if}
			{#if subtext}
				<p class="text-surface-4 text-xs">{subtext}</p>
			{/if}
		</div>
		<input
			bind:this={input}
			id={label}
			size={length}
			type="file"
			on:focus={() => (focus = true)}
			on:blur={() => (focus = false)}
			on:click
			on:input={onInput}
			bind:files={unfilteredFiles}
			{accept}
			{multiple}
			data-form-element="textinput"
		/>
	</label>
</div>

<style>
	.area-style {
		@apply overflow-hidden invalid:border-red-500 flex flex-col items-center font-medium border border-dashed border-surface-3 text-surface-10 text-sm rounded-lg ring-0 w-full p-8 transition-all;
	}

	.button-focus {
		@apply ring-2 ring-accent-5 border-accent-5 ring-opacity-50;
	}

	.area-error {
		@apply border-red-300;
	}

	.button {
		@apply focus:scale-[1.05] duration-500 active:brightness-[120%] whitespace-nowrap hover:scale-[1.05] active:shadow-none active:scale-100 hover:shadow-xl hover:brightness-[105%];
	}

	.button-error {
		@apply bg-red-500 text-surface-0;
	}

	.dragover {
		@apply bg-accent-1 border-accent-5;
	}

	input[type='file'] {
		width: 0;
		height: 0;
		opacity: 0;
		overflow: hidden;
	}

	.hide {
		display: none;
	}

	.p {
		@apply text-xs md:text-sm w-full line-clamp-2 lg:line-clamp-1 overflow-hidden text-ellipsis text-center;
	}
</style>
