<script lang="ts">
	export let href: string | null = null;
	export let tabindex: number | null = null;
	export let selectNone: boolean = false;

	let className = '';
	export { className as class };
</script>


{#if href}
	<a {href} {tabindex} on:click on:blur class={className + '  group'}>
		<slot />
	</a>
{:else}
	<button on:click tabindex class={`${selectNone ? 'hover:cursor-default ' : ''}${className} group`} >
		<slot />
	</button>
{/if}

<style>
	.button {
	@apply active:brightness-[120%] whitespace-nowrap hover:scale-[1.05] focus:scale-[1.05] active:shadow-none active:scale-100 hover:shadow-xl hover:brightness-[105%] flex gap-2 items-center font-semibold transition-all ease-in-out duration-500 focus:outline-none rounded-xl cursor-pointer px-5 py-2.5 text-xs border-2 bg-primary-5 border-primary-5 text-white;
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

	/* WHITE BUTTON */
	.button.white {
		@apply border-0 bg-surface-0 border-white text-surface-10;
	}

	/* PRIMARY BUTTON AND VARIATIONS */
	.button.primary {
		@apply border-2 bg-primary-5 border-primary-5 text-white;
	}

	.button.primary.glowing {
		@apply shadow-glow shadow-primary-8 hover:shadow-glow-lg hover:shadow-primary-8;
	}

	/* SECONDARY BUTTON AND VARIATIONS */
	.button.accent {
		@apply border-2 bg-accent-5 border-accent-5 text-accent-1;
	}

	.button.accent.glowing {
		@apply shadow-glow shadow-accent-3 hover:shadow-glow-lg hover:shadow-accent-4;
	}

	/* SURFACE BUTTON AND VARIATIONS */
	.button.surface {
		@apply border-2 bg-surface-2 border-surface-2 text-surface-8;
	}

	.button.surface.outlined {
		@apply border-surface-4 text-surface-4;
	}

	.button.surface.outlined.dark {
		@apply text-surface-0 border-surface-2;
	}

	.button.surface.glowing.dark {
		@apply shadow-glow shadow-surface-8 hover:shadow-glow-lg hover:shadow-surface-8;
	}

	/* OUTLINED BUTTON */
	.button.outlined {
		@apply bg-opacity-0;
	}
</style>
