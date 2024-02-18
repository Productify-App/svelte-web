<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import Logo from "$lib/components/Logo.svelte";
    import {goto} from "$app/navigation";
    import { onMount } from 'svelte';

    export let darkMode = false;
    export let absolute = false;
    export let monochrome = false;

    let active = null;

    onMount(() => {
        setLink(window.location.pathname);
        console.log(window.location.pathname);
    });

    function redirected(link) {
        setLink(link);
        goto(link);
    }

    function setLink(link) {
        active = link;
        monochrome = link === "/jobs";
    }

    let links = [
        { name: "Home", link: "/" },
        { name: "Jobs", link: "/jobs" },
    ];
</script>

<nav class:absolute class="w-screen">
    <div class="px-8 flex items-center w-screen justify-between h-20 max-w-screen-xl mx-auto">
        <Logo on:click={() => redirected("/")} />
        <div class="flex gap-4">
            {#each links as link}
                <a href="{link.link}"
                    class="text-white hover:underline p-2 rounded-lg transition-all ease-in-out duration-300"
                   class:font-semibold={active === link.link}
                   class:font-normal={active !== link.link}
                    on:click={() => redirected(link.link)}>
                    {link.name}
                </a>
            {/each}
        </div>
        <Button label="Submit an application" class={darkMode ? "dark" : ""} color={monochrome ? "white" : "primary"} link="/application/submit" />
    </div>
</nav>