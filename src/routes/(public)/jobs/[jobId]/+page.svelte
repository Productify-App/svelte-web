<script lang="ts">
    import { type job } from "$lib/types";

    import Saos from "saos";
    import Button from "$lib/components/Button.svelte";
    import {ArrowLeft} from "svelte-hero-icons";
    import {onMount} from "svelte";
    import Divider from "$lib/components/Divider.svelte";
    import Footer from "$lib/components/Footer.svelte";

    export let data: {
        job: job
    };

    onMount(() => {
        console.log(data.job);
    });
</script>

{#if !data.job}
    <div class="flex justify-center items-center h-screen bg-primary-5">
        <div class="flex flex-col gap-4 items-center">
            <h1 class="display-lg text-center text-primary-9 drop-shadow-xl">Job not found</h1>
            <Button label="Go back to job listings" color="surface" class="w-min" leftIcon={ArrowLeft} link="/jobs" />
        </div>
    </div>
{:else}
    <section id="top" class="-z-20 max-h-[800px] pt-20 bg-primary-5">
        <div class="max-w-screen-md px-8 pb-8 mx-auto gap-24 pt-20">
            <div class="flex flex-col gap-4 shrink">
                <h1 class="display-md z-30 text-white mx-auto w-full">
                    {data.job.title}
                </h1>
                <h1 class="text-lg font-bold  z-30 text-primary-2 mx-auto w-full">
                    {data.job.locations.join(" OR ").toUpperCase()}
                </h1>
<!--                <div class="flex gap-4 justify-center mt-16">-->
<!--                    <Saos once={true} animation={"slide-up 1s cubic-bezier(0.55, 0, 0.1, 1) both"}>-->
<!--                        <Button label="See available positions" color="white" size="lg" link="#listings" />-->
<!--                    </Saos>-->
<!--                </div>-->
            </div>
        </div>
        <svg class="w-screen bg-white" viewBox="0 0 1728 111" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1265.2 56.44C1181.68 45.65 1100.81 26.31 1017.52 14.58C898.877 -2.14 775.325 -3.15 656.87 14.19C541.757 31 422.395 72 308.65 92.83C207.778 111.31 97.6464 118.92 -0.00012207 95.83V0H1728V27.35C1580.45 66.2042 1420.4 76.2645 1265.2 56.44Z" fill="#1A66FF"/>
        </svg>
    </section>
    <section class="max-w-screen-md mx-auto px-8 py-10 flex flex-col gap-8 mb-[17vh]">
        <div class="flex gap-2">
            {#each data.job.tags as tag}
                <div class="px-4 py-2 bg-surface-5 rounded-full">
                    <p class="text-white">{tag}</p>
                </div>
            {/each}
        </div>
        <Divider />
        <h1 class="text-xl font-semibold text-surface-9">Description</h1>
        <p class="text-surface-7">
            {data.job.overview}
        </p>
    </section>
    <Footer />
{/if}