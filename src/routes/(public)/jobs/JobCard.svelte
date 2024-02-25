<script lang="ts">
    // import { type job } from "$lib/types";

    import { fade } from 'svelte/transition';
    import Button from "$lib/components/Button.svelte";
    export let info: job;
</script>

<div in:fade={{ delay: 250, duration: 300 }} class="sliding-cards h-min col-span-1 shrink-0 bg-white border-2 border-surface-3 hover:shadow-lg shadow-surface-2 rounded-xl p-8 sliding-cards">
    <h5 class="text-4xl font-bold text-surface-10 whitespace-nowrap">{info.title}</h5>
    <p class="text-surface-8 mt-4">{info.tags.map((i) => i.substring(0, 1).toUpperCase() + i.substring(1)).join(' • ')}</p>
    <div class="flex items-center mt-4 gap-4">
        <Button label="Learn more" color="surface" link={`/jobs/${info.id}#top`} />
        <p class="text-surface-6 text-sm">{info.locations.join(" or ")}</p>
    </div>
</div>