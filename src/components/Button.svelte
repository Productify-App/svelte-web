<script lang="ts">
    export let label = "Hello World";
    export let link = "#";
    export let color: "primary"| "secondary" | "accent" = "primary";
    export let size: "sm" | "md" | "lg" | "xl" = "md";
    export let outlined = false;
</script>

<style>
    .button {
        @apply font-semibold flex items-center hover:brightness-125 transition-all rounded-xl cursor-pointer px-5 py-2.5 text-xs border-2 bg-primary-5 border-primary-5 text-primary-1;
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

    .button.accent {
        @apply border-2 bg-accent-5 border-accent-5 text-accent-1;
    }

    .button.surface {
        @apply border-2 bg-surface-3 border-surface-3 text-surface-6;
    }

    .button.outlined.primary {
        @apply bg-transparent text-primary-7 hover:bg-primary-5 hover:text-primary-1;
    }

    .button.outlined.accent {
        @apply bg-transparent text-accent-7 hover:bg-accent-5 hover:text-accent-9;
    }

    .button.outlined.surface {
        @apply bg-transparent text-surface-6 hover:bg-surface-3 hover:text-surface-7;
    }
</style>

<a href={link} on:click class:outlined class={`button hover:-translate-y-[5%] hover:shadow ${color} ${size} flex gap-2 items-center`}>
    <slot name="icon left" />
    {label}
    <slot name="icon right" />
</a>