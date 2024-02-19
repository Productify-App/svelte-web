<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import Logo from "$lib/components/Logo.svelte";
    import {goto} from "$app/navigation";
    import { onMount } from 'svelte';
    import {navigating} from "$app/stores";

    export let absolute = false;
    export let mode: "dark" | "light" | "blue" = "dark";

    const links = [
        { name: "Home", link: "/" },
        { name: "Jobs", link: "/jobs" },
        { name: "Contact", link: "mailto:mail.productify@gmail.com" }
    ];

    let active = null;

    let btnColor: "primary" | "white" = "primary";
    let text: "light" | "dark" = "light";
    let icon: "accent" | "light" = "accent";

    onMount(() => {
        setLink(window.location.pathname);
        console.log(window.location.pathname);
        updateMode();
    });

    function setLink(link) {
        active = link;
        updateMode();
    }

    function redirected(link) {
        setLink(link);
        goto(link);
    }

    $: if ($navigating) {
        console.log($navigating.to.url.pathname);
        setLink($navigating.to.url.pathname);
    }

    function updateMode() {
        if (isActive("/jobs/listings")) {
            setMode("light");
        } else if (isActive("/jobs")) {
            setMode("primary");
        } else {
            setMode("dark");
        }
    }

    function setMode(mode) {
        if (mode === "dark") {
            text = "light";
            icon = "accent";
            btnColor = "primary";
        } else if (mode === "light") {
            text = "dark";
            icon = "accent";
            btnColor = "primary";
        } else if (mode === "primary") {
            text = "light";
            icon = "light";
            btnColor = "white";
        }
    }

    function isActive(link) {
        if (active === "/" || link === "/") {
            return active === link;
        }

        return active.startsWith(link);
    }
</script>

<style>
    .selected {
        @apply font-semibold;
    }

    .unselected {
        @apply font-normal;
    }
</style>

<nav class:absolute class="w-screen">
    <div class="px-8 flex items-center w-screen justify-between h-20 max-w-screen-xl mx-auto">
        <Logo text={text} icon={icon} link="/" />
        <div class="flex gap-4">
            {#each links as link}
                <a href="{link.link}"
                    class="hover:underline p-2 rounded-lg transition-all ease-in-out duration-300"
                   class:text-white={text === "light"} class:text-surface-100={text !== "light"}
                   class:selected={link.link === active}
                   class:unselected={link.link !== active}
                    on:click={() => redirected(link.link)}>
                    {link.name}
                </a>
            {/each}
        </div>
        <Button label="Submit an application" color={btnColor} link="/jobs/listings" />
    </div>
</nav>