<script lang="ts">
    export let title: string;
    export let description: string;
</script>

<div class="p-12 flex flex-col items-center bg-accent-1 border border-accent-4 rounded-xl  shadow-xl shadow-accent-2">
    <slot name="icon" />
    <div>

    </div>
    <h1 class="heading-lg bold mt-5 text-center w-full">{title}</h1>
    <p class=" mt-5 text-center w-full">{description}</p>
</div>