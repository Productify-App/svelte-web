<script lang="ts">
    export let href: string | null = null;
    export let tabindex: number | null = null;
</script>

{#if href}
    <a href={href} tabindex on:click on:blur>
        <slot />
    </a>
{:else}
    <button on:click tabindex>
        <slot />
    </button>
{/if}