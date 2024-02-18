<script lang="ts">
    import Saos from "saos";
    import FeatureCard from "../../routes/FeatureCard.svelte";
    import {Bolt, ComputerDesktop, Icon} from "svelte-hero-icons";
    export let blue = false;
    let className = "";

    export { className as class };

    const benefits = [
        {
            title: "We're a remote-first company",
            description: "We believe in the power of remote work. We're a remote-first company, and we believe that you should be able to work from anywhere in the world.",
            icon: ComputerDesktop
        },
        {
            title: "Paid leave",
            description: "We all need a break from time to time. We offer paid leave to all of our employees, so you can take the time you need to recharge and come back refreshed.",
            icon: Bolt
        },
        {
            title: "We're a remote-first company",
            description: "We believe in the power of remote work. We're a remote-first company, and we believe that you should be able to work from anywhere in the world.",
            icon: ComputerDesktop
        },
        {
            title: "Paid leave",
            description: "We all need a break from time to time. We offer paid leave to all of our employees, so you can take the time you need to recharge and come back refreshed.",
            icon: Bolt
        },
        {
            title: "We're a remote-first company",
            description: "We believe in the power of remote work. We're a remote-first company, and we believe that you should be able to work from anywhere in the world.",
            icon: ComputerDesktop
        },
        {
            title: "Paid leave",
            description: "We all need a break from time to time. We offer paid leave to all of our employees, so you can take the time you need to recharge and come back refreshed.",
            icon: Bolt
        },
        // {
        //     title: "Paid leave",
        //     description: "We all need a break from time to time. We offer paid leave to all of our employees, so you can take the time you need to recharge and come back refreshed.",
        //     icon: Bolt
        // }
    ]
</script>

{#if blue}
    <section class={`overflow-hidden relative bg-primary-1 justify-center gap-24 -z-20 ${className}`}>
        <div class="absolute blurbox bg-primary-2 left -z-10" />
        <div class="absolute blurbox bg-primary-2 right -z-10" />
        <div class="max-w-screen-xl px-8 py-32 mx-auto z-10">
            <Saos once={true} animation={"slide-up 1s cubic-bezier(0.55, 0, 0.1, 1) both"}>
                <h1 class="heading-2xl bold text-accent-10 w-1/2 text-center mx-auto">
                    Why work for Productify?
                </h1>
            </Saos>
            <div class="mx-auto grid grid-cols-3 grid-rows-2 gap-8 items-center mt-16 fade-out-bottom">
                {#each benefits as benefit, i}
                    <Saos once={true} animation={`slide-up-big 1s cubic-bezier(0.55, 0, 0.1, 1) both ${i * 0.1}s`}>
                        <div class="col-span-1">
                            <Icon src="{benefit.icon}" class="w-16 h-16 text-primary-6 stroke-[1.5]" />
                            <h3 class="heading-md font-bold my-2 text-primary-10">
                                {benefit.title}
                            </h3>
                            <p class="text-primary-9 line-clamp-4">
                                {benefit.description}
                            </p>
                        </div>
                    </Saos>
                {/each}
            </div>
        </div>
    </section>
{:else}
    <section class={`overflow-hidden relative bg-accent-1 justify-center gap-24 -z-20 ${className}`}>
        <div class="absolute blurbox bg-accent-2 left -z-10" />
        <div class="absolute blurbox bg-accent-2 right -z-10" />
        <div class="max-w-screen-xl px-8 py-32 mx-auto z-10">
            <Saos once={true} animation={"slide-up 1s cubic-bezier(0.55, 0, 0.1, 1) both"}>
                <h1 class="heading-2xl bold text-accent-10 w-1/2 text-center mx-auto">
                    Why work for Productify?
                </h1>
            </Saos>
            <div class="mx-auto grid grid-cols-3 grid-rows-2 gap-8 items-center mt-16 fade-out-bottom">
                {#each benefits as benefit, i}
                    <Saos once={true} animation={`slide-up-big 1s cubic-bezier(0.55, 0, 0.1, 1) both ${i * 0.1}s`}>
                        <div class="col-span-1">
                            <Icon src="{benefit.icon}" class="w-16 h-16 text-accent-6 stroke-[1.5]" />
                            <h3 class="heading-md font-bold my-2 text-accent-10">
                                {benefit.title}
                            </h3>
                            <p class="text-accent-9 line-clamp-4">
                                {benefit.description}
                            </p>
                        </div>
                    </Saos>
                {/each}
            </div>
        </div>
    </section>
{/if}