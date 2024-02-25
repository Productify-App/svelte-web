<script lang="ts">
    import { buildDebouncer } from "$lib/utils";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let maxlength: number | undefined = undefined;
    export let showCounter = true;
    let typeValue: 'email' | 'text' | 'password' = 'text';
    export { typeValue as type };
    export let value = '';
    export let length = 0;
    export let placeholder = '';
    export let label = '';
    export let required = false;
    export let debounce = false;
    export let debouncetime = 500;
    export let validation = (value: string) => true;
    export let transform = (value: string) => value;
    export let valid = true;
    export let error = '';
    export let pattern = undefined;
    export let focus = false;
    export let name = '';

    let buffer = value;

    $: setBuffer(value);

    function setBuffer(value: string) {
        buffer = value;
    }

    $: {
        if (focus) {
            dispatch('focus', { value: buffer });
        } else {
            dispatch('blur', { value: buffer });
        }
    }

    $: if (!debounce) {
        if (valid) {
            value = transform(buffer);
        }
    }

    $: { buffer; onChange(); }
    $: { valid; onInvalid(); }

    function onInvalid(event: Event) {
        if (!valid) {
            dispatch('invalid', {value: event});
        }
    }

    function onChange(event: Event) {
        valid = validation(buffer);
        dispatch('change', { value: event });
    }

    const debounceCallback = buildDebouncer((value) => {
        console.log("debounce");
        valid = validation(buffer);

        if (valid) {
            value = transform(buffer);
        }

        dispatch('debounce', { value: buffer });
    }, debouncetime);

    $: if (debounce) debounceCallback(buffer);

    $: length = buffer.length;

    let input: HTMLInputElement | null = null;
</script>

<style>
    .area-style {
        @apply invalid:border-red-500 font-medium bg-surface-0/25 border border-surface-3 text-surface-10 text-sm rounded-lg ring-0 w-full p-2.5 transition-all hover:border-accent-5;
    }

    .area-style.input-error {
        @apply border-red-500 ring-red-500 ring-opacity-50;
    }

    .input-focus {
        @apply ring-2 ring-accent-5 border-accent-5 ring-opacity-50;
    }
</style>

<div class="{$$restProps.class || ''} relative group" on:mousedown={() => input?.focus()} on:click={() => { input?.focus(); focus = true}}>
    <label for={input} class="label">
        {#if label}
            <div class="flex justify-between items-center mb-1">
                <span class="text-surface-8 text-sm font-semibold">{label}<span class="text-red-500">{required ? '*' : ''}</span>{error ? " - ": ""}</span>
            </div>
        {/if}
        <div class="area-style flex m-0 p-0 hover:cursor-text overflow-hidden" class:input-focus={focus} class:input-error={!valid}>
            <slot name="before" />
            <input bind:this={input} size={length} class="text-surface-8 placeholder-surface-4 text-sm m-0 p-0 grow border-none bg-surface-0 bg-opacity-0 outline-none focus:ring-0" type="text" on:invalid on:focus={() => focus = true} on:blur={() => focus = false} on:click on:input bind:value={buffer} {maxlength} {placeholder} {pattern} {name} />
            <slot name="after" />
        </div>
        {#if maxlength && showCounter}
            <div class:opacity-100={focus} class:opacity-0={!focus} class="text-xs text-right text-surface-3 absolute top-0.5 transition-opacity" class:right-2={label.length === 0}  class:right-0={label.length > 0}>
                {length}/{maxlength}
            </div>
        {/if}
    </label>
</div>
