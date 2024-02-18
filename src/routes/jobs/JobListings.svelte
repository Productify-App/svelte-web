<script lang="ts">
    import ButtonTabs from "$lib/components/ButtonTabs.svelte";

    let tabs = ["All Positions", "Design", "Marketing", "Management", "Development"];
    let tab = 0;
</script>

<section class="py-24 max-w-screen-xl mx-auto">
    <h1 class="w-full text-center display-sm bold text-surface-10">Let's get working together!</h1>
    <ButtonTabs bind:tab bind:tabs={tabs} on:change={(label) => console.log(tabs[tab])} class="mt-8 w-full justify-center" />
    <p class="w-full hd-56 flex items-center justify-center">
        Coming soon.
    </p>
</section>