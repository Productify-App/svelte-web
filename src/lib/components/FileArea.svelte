<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';
    import {Check, UploadIcon} from "lucide-svelte";

    const dispatch = createEventDispatcher();

    export { typeValue as type };
    export let multiple = false;
    export let files: File[] = [];
    export let maxsize: number = 10;
    export let length = 0;
    export let value = null;
    export let label = '';
    export let accept = '';
    export let subtext = '';
    export let required = false;
    export let validation = (value: File[]) => true;
    export let transform = (value: File[]) => value;
    export let valid = true;
    export let invalid = false;
    export let error = '';
    export let focus = false;

    let dragover = false;
    let unfilteredFiles: File[] | null = files;
    let isDragAndDropSupported = false;

    $: invalid = !valid;

    $: {
        if (focus) {
            dispatch('focus', { value: files });
        } else {
            dispatch('blur', { value: files });
        }
    }

    $: {
        try {
            if (multiple) {
                files = transform(unfilteredFiles);
            } else {
                files = [transform(unfilteredFiles[0])];
            }
            error = '';
            valid = true;
        } catch (e) {
            if (unfilteredFiles?.length) {
                // buffer array remove last element
                unfilteredFiles = [];
                files = [];
                valid = false;
                error = e.message;
            }
        }
    }

    $: if (!multiple) value = files.length ? files[0] : null;

    $: { unfilteredFiles; onChange(); }
    $: { invalid; onInvalid(); }

    function onInvalid() {
        if (invalid) {
            dispatch('invalid', { value: unfilteredFiles });
        }
    }

    function onChange() {
        if (multiple && unfilteredFiles.length ) {
            dispatch('change', { value: unfilteredFiles });
        } else if (unfilteredFiles.length) {
            dispatch('change', { value: unfilteredFiles[0] });
        } else {
            dispatch('change', { value: null });
        }
    }

    let input: HTMLInputElement | null = null;
    let dragOverArea: HTMLDivElement | null = null;

    function byteSizeToString(size: number) {
        const i = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(1) + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
    }

    onMount(() => {
        isDragAndDropSupported = 'draggable' in document.createElement('div') &&
                                 'ondragstart' in document.createElement('div') &&
                                 'ondrop' in document.createElement('div');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dragOverArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            console.log(e);
            e.stopPropagation();
        }

        dragOverArea.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            let dt = e.dataTransfer;
            let files = dt.files;
            dragover = false;

            handleFiles(files);
        }

        function handleFiles(files) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];

                // add file to buffer array
                if (multiple) {
                    unfilteredFiles = [...unfilteredFiles, file];
                } else {
                    unfilteredFiles = [file];
                }

                console.log('File:', file.name);
            }
        }

        // Additional styling for dragover and dragleave events (optional)
        dragOverArea.addEventListener('dragover', () => {
            dragover = true;
        });

        dragOverArea.addEventListener('dragleave', () => {
            dragover = false;
        });
    });

    function ellipsisInTheMiddle(str, max) {
        if (str.length > max) {
            return str.substring(0, max / 2) + '...' + str.substring(str.length - max / 2, str.length);
        }
        return str;
    }
</script>

<style>
    .area-style {
        @apply overflow-hidden invalid:border-red-500 flex flex-col items-center font-medium border border-dashed border-surface-3 text-surface-10 text-sm rounded-lg ring-0 w-full p-8 transition-all;
    }

    .button-focus {
        @apply ring-2 ring-accent-5 border-accent-5 ring-opacity-50;
    }

    .area-error {
        @apply border-red-300;
    }

    .button {
        @apply focus:scale-[1.05] duration-500 active:brightness-[120%] whitespace-nowrap hover:scale-[1.05] active:shadow-none active:scale-100 hover:shadow-xl hover:brightness-[105%]
    }

    .button-error {
        @apply bg-red-500 text-surface-0;
    }

    .dragover {
        @apply bg-accent-1 border-accent-5;
    }

    input[type="file"] {
        width: 0;
        height: 0;
        opacity: 0;
        overflow: hidden;
    }

    .hide {
        display: none;
    }

    .p {
        @apply text-xs md:text-sm w-full line-clamp-2 lg:line-clamp-1 overflow-hidden text-ellipsis text-center;
    }
</style>

<div  bind:this={dragOverArea} class="{$$restProps.class || ''} relative group" on:click={() => input?.focus()}>
    <label for={label} class="label">
        {#if label}
            <div class="flex justify-between items-center">
                <span class="text-surface-8 text-sm font-semibold">{label}<span class="text-red-500">{required ? '*' : ''}</span></span>
            </div>
        {/if}
        <div class:dragover={dragover} class="area-style hover:cursor-pointer" class:area-error={!valid}>
            <div class:button-focus="{focus}" class="button hover:border-accent-5 bg-surface-0/25 transition-all rounded-full border border-surface-2 p-4 mb-1">
                {#if value}
                    <Check class="text-accent-5 h-6 w-6" />
                {:else}
                    <UploadIcon class="text-accent-5 h-6 w-6" />
                {/if}
            </div>
            {#if value}
                <p class="text-surface-8 p">{ellipsisInTheMiddle(value.name, 35)} <span class="text-surface-5">({byteSizeToString(value.size)})</span></p>
            {:else}
                {#if error}
                    <p class="text-red-500 p">{error}</p>
                {:else}
                    <p class="text-surface-8 p"><span class="text-accent-5 font-semibold">Select a file</span> <span class:hide={!isDragAndDropSupported}>or drag and drop one.</span></p>
                {/if}
            {/if}
            {#if subtext}
                <p class="text-surface-4 text-xs">{subtext}</p>
            {/if}
        </div>
        <input bind:this={input} id={label} size={length} type="file" on:invalid on:focus={() => focus = true} on:blur={() => focus = false} on:click on:input bind:files={unfilteredFiles} {accept} {multiple} />
    </label>
</div>
