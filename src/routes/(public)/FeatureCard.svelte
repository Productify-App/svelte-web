<script lang="ts">
	import { type ComponentType } from 'svelte';
	import { ArrowRight, type Icon } from 'lucide-svelte';
	export let title: string;
	export let description: string;

	export let icon: ComponentType<Icon> = ArrowRight;
</script>

<div
	class="p-12 max-h-full flex flex-col items-center col-span-1 bg-accent-1 border border-accent-4 rounded-xl shadow-xl shadow-accent-2"
>
	<svelte:component this={icon} class="w-20 h-20 text-accent-7" strokeWidth="1.5" />
	<h1 class="heading-lg bold mt-5 text-center w-full text-accent-10">{title}</h1>
	<p class=" mt-5 text-center w-full text-accent-8">{description}</p>
</div>
