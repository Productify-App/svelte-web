<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	export let page = 1;
	export let maxPage = 3;
	export let onSubmit: () => void;

	export let backward = () => {
		return;
	};
	export let submitting = false;

	function onBackward(event: MouseEvent) {
		event.preventDefault();

		if (page > 1) {
			backward();
		}
	}

	function submit(e: Event) {
		e.preventDefault();
		onSubmit();
	}
</script>

<div class="flex gap-4 pt-6">
	{#if page > 1 && page <= maxPage}
		<Button on:click={onBackward} outlined color="surface" label="Previous" class="w-full" />
	{/if}
	{#if page < maxPage}
		<Button on:click={submit} label="Next" class="w-full" />
	{/if}
	{#if page >= maxPage}
		<Button
			on:click={submit}
			label={submitting ? 'Submitting...' : 'Submit application'}
			class="w-full"
			disabled={submitting}
		/>
	{/if}
</div>
