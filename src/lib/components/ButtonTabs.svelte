<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import {createEventDispatcher} from "svelte";

    export let tab: number;
    export let tabs: string[];
    let className = "";

    export {className as class};

    const dispatch = createEventDispatcher();

    function handleClick(i: number) {
        tab = i;
        dispatch("change", {tab, label: tabs[i]});
    }
</script>

<div class={`flex gap-4 ${className}`}>
    {#each tabs as tabLabel, i}
        <Button label={tabLabel} outlined={tab !== i} color={tab === i ? "primary" : "surface"} on:click={() => handleClick(i)} />
    {/each}
</div>
