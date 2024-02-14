<script lang="ts">
    import {ArrowRight, Icon} from "svelte-hero-icons";
    export let title: string;
    export let description: string;
    export let icon: string = ArrowRight;
</script>

<div class="p-12 flex flex-col items-center bg-accent-1 border border-accent-4 rounded-xl shadow-xl shadow-accent-2">
    <Icon src="{icon}" class="w-20 h-20 text-accent-7" />
    <h1 class="heading-lg bold mt-5 text-center w-full text-accent-10">{title}</h1>
    <p class=" mt-5 text-center w-full text-accent-8">{description}</p>
</div>