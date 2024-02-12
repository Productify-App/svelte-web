<script>
    import "../app.css";
    import Button from "$lib/components/Button.svelte";
</script>

<nav class="flex items-center max-w-screen-xl px-8 mx-auto w-screen py-5 justify-between">
    <h1 class="font-semibold">Productify</h1>

    <Button label="Submit an application" link="/application/submit" />
</nav>

<slot />