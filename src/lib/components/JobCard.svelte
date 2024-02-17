<script lang="ts">
    import Button from "$lib/components/Button.svelte";

    export let title: string;
    export let tags: Array<string>;
    export let location: string;
    export let id: string;
</script>

<div class="w-[30rem] bg-surface-9 border-2 border-surface-6 shadow-lg shadow-surface-8 rounded-xl p-8 infinite-scroll-x">
    <h5 class="text-4xl font-bold text-white whitespace-nowrap mr-10">{title}</h5>
    <p class="text-surface-2 mt-4">{tags.map((i) => i.substring(0, 1).toUpperCase() + i.substring(1)).join(' • ')}</p>
    <div class="flex items-center mt-4 gap-4">
        <Button label="Learn more" color="white" />
        <p class="text-surface-4 text-sm">{location}</p>
    </div>
</div>