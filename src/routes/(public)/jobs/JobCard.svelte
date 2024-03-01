<script lang="ts">
	// import { type job } from "$lib/types";

	import { fade } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';
	import type {DBJob} from "$lib/types";
	export let info: DBJob;

	const redirectOptions = {
		noScroll: false
	}

	let locations = info.expand.locations.map((i) => i.location);
	let tags = info.expand.tags.map((i) => i.tag);
</script>

<div
	in:fade={{ delay: 250, duration: 300 }}
	class="sliding-cards h-min col-span-1 shrink-0 bg-white border transition-all border-surface-3 shadow shadow-surface-2 rounded-xl p-8 sliding-cards"
>
	<h5 class="text-4xl font-bold text-surface-10 whitespace-nowrap">{info.title}</h5>
	<p class="text-surface-8 mt-4">
		{tags.map((i) => i.substring(0, 1).toUpperCase() + i.substring(1)).join(' • ')}
	</p>
	<div class="flex items-center mt-4 gap-4">
		<Button redirectOptions={redirectOptions} label="Learn more" color="surface" link={`/jobs/${info.id}`} />
		<p class="text-surface-6 text-sm">{locations.join(' or ')}</p>
	</div>
</div>
