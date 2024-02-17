<script lang="ts">
    import {Icon, type IconSource} from "svelte-hero-icons";

    export let label = "Hello World";
    export let link = "#";
    export let color: "primary"| "secondary" | "accent" | "white" = "primary";
    export let size: "sm" | "md" | "lg" | "xl" = "md";
    export let outlined = false;
    export let leftIcon: IconSource | null = null;
    export let rightIcon: IconSource | null = null;

    let className: string;

    export { className as class };
</script>

<style>
    .button {
        @apply active:brightness-[120%] whitespace-nowrap hover:scale-[1.05] active:shadow-none active:scale-100 hover:shadow-xl hover:brightness-[105%] flex gap-2 items-center font-semibold transition-all ease-in-out duration-500 rounded-xl cursor-pointer px-5 py-2.5 text-xs border-2 bg-primary-5 border-primary-5 text-white;
    }

    .button.sm {
        @apply px-4 py-2 text-xs;
    }

    .button.lg {
        @apply px-6 py-3 text-sm h-14;
    }

    .button.xl {
        @apply px-8 py-4 text-base;
    }

    .button.primary {
        @apply border-2 bg-primary-5 border-primary-5 text-white;
    }

    .button.white {
        @apply border-2 bg-surface-0 border-white text-surface-10;
    }

    .button.primary.glowing {
        @apply shadow-glow shadow-primary-8 hover:shadow-glow-lg hover:shadow-primary-8;
    }

    .button.accent {
        @apply border-2 bg-accent-5 border-accent-5 text-accent-1;
    }

    .button.surface {
        @apply border-2 bg-surface-3 border-surface-3 text-surface-6;
    }

    .button.white {
        @apply border-2 bg-white border-white text-surface-10;
    }

    .button.outlined.primary {
        @apply bg-transparent text-primary-7 hover:bg-primary-5 hover:text-primary-1;
    }

    .button.outlined.accent {
        @apply bg-transparent text-accent-7 hover:bg-accent-5 hover:text-accent-9;
    }

    .button.outlined.surface {
        @apply text-surface-7 bg-surface-2 border-surface-2 hover:text-surface-9;
    }

    .button.dark.surface {
        @apply bg-surface-8 text-surface-0 border-2 border-surface-8;
    }

    .button.dark.surface.glowing {
        @apply shadow-glow shadow-surface-8 hover:shadow-glow-lg hover:shadow-surface-8;
    }
</style>

<a href={link} on:click class:outlined class={`button ${color} ${size} ${className}`}>
    {#if leftIcon}
        <Icon src="{leftIcon}" class="w-5 h-5 stroke-2" />
    {/if}
    {label}
    {#if rightIcon}
        <Icon src="{rightIcon}" class="w-5 h-5 stroke-2" />
    {/if}
</a>