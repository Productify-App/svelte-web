<script lang="ts">
	import { type ComponentType } from 'svelte';
	import { ArrowRight, type Icon } from 'lucide-svelte';
	import DynamicButton from '$lib/components/DynamicButton.svelte';

	export let label = 'Hello World';
	export let link = '';
	export let color: 'primary' | 'secondary' | 'accent' | 'white' = 'primary';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let outlined = false;
	export let notab = false;
	export let leftIcon: ComponentType<Icon> | null = null;
	export let rightIcon: ComponentType<Icon> | null = null;

	let className: string;

	export { className as class };
</script>

<DynamicButton href={link} on:click tabindex={notab ? '-1' : undefined} class={`button ${color} ${size} ${className} ${outlined ? 'outlined' : ''}`}>
	{#if leftIcon}
		<svelte:component this={leftIcon} class="w-5 h-5 stroke-2" />
	{/if}
	<p class="grow text-center">{label}</p>
	{#if rightIcon}
		<svelte:component this={rightIcon} class="w-5 h-5 stroke-2" />
	{/if}
</DynamicButton>