<script lang="ts">
    import ButtonTabs from "$lib/components/ButtonTabs.svelte";
    import JobCard from "./JobCard.svelte";
    import { type job } from "$lib/types";
    import Button from "$lib/components/Button.svelte";
    import { fade } from 'svelte/transition';

    let tabs = ["All Positions", "Design", "Marketing", "Management", "Development", "Software"];
    let tab = 0;

    export let jobs: job[];
    let filteredJobs: job[] = [];

    $: filteredJobs = filterJobs(jobs, null);
    function filterJobs(jobs: job[], category: string | null = null) {
        console.log(category);

        if (category === null) {
            return jobs;
        }

        return jobs.filter(job => job.tags.includes(category));
    }
</script>

<section id="listings" class="py-24 max-w-screen-xl mx-auto">
    <h1 class="w-full text-center display-sm bold text-surface-10">Let's get working together!</h1>
    <ButtonTabs bind:tab bind:tabs={tabs} on:change={() => filteredJobs = filterJobs(jobs, tabs[tab] === "All Positions" ? null : tabs[tab])} class="mt-12 w-full justify-center" />
    <div class="px-20 mt-8 gap-4 grid grid-cols-2 justify-center min-h-56">
        {#each filteredJobs as job}
            <JobCard info={job} transition />
        {:else}
            <div class="py-20 col-span-2 flex items-center justify-center">
                <p in:fade={{ delay: 250, duration: 300 }} class="text-lg font-semibold text-surface-4">
                    There are no positions open for this category.
                </p>
            </div>
        {/each}
    </div>
</section>