<script lang="ts">
    import Saos from "saos";
    import Button from "$lib/components/Button.svelte";
    import Benefits from "$lib/components/Benefits.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import JobListings from "./JobListings.svelte";
    import { type Job } from "$lib/types";

    export let data: {
        jobs: Job[];
    };
</script>

<section id="top" class="-z-20 max-h-[800px] pt-20 bg-primary-5">
    <div class="max-w-screen-xl px-8 pb-8 mx-auto gap-24 pt-20">
        <div class="flex flex-col gap-4 shrink">
            <h1 class="display-lg z-30 text-white w-3/5 mx-auto text-center">
                Find what works for <span class="display-lg bold text-white relative before:bg-white before:bg-opacity-10 before:-rotate-6 before:z-[-1] before:absolute before:inset-0 before:transform before:scale-x-110">you</span>
            </h1>
            <div class="flex gap-4 justify-center mt-16">
                <Saos once={true} animation={"slide-up 1s cubic-bezier(0.55, 0, 0.1, 1) both"}>
                    <Button label="See available positions" color="white" size="lg" link="#listings" />
                </Saos>
            </div>
        </div>
    </div>
    <svg class="w-screen bg-white mt-20" viewBox="0 0 1728 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.25" d="M0 0V46.29C68.8176 68.49 149.17 78.46 227.52 74.29C328.838 68.92 423.835 40.98 525.312 36.79C631.642 32.43 737.77 53.67 839.52 72.05C939.269 90.05 1038.67 96.93 1141.06 85.13C1193.11 79.13 1241.64 67.29 1291.46 55.79C1424.87 25 1602.72 -14.29 1728 52.47V0H0Z" fill="#1A66FF"/>
        <path opacity="0.5" d="M0 0V15.81C18.72 36.92 39.8016 56.86 68.6736 72.05C143.15 111.27 237.6 111 323.395 91.58C368.251 81.43 409.925 65.51 452.52 51.78C511.445 32.78 574.531 5.78 640.915 2.11C693.13 -0.74 743.011 11.53 782.899 33.67C828.648 59.06 872.64 95.67 932.126 106.67C990.36 117.46 1049.27 99.98 1103.67 82.39C1158.08 64.8 1211.9 43.39 1272.04 39.34C1358.05 33.49 1435.16 62.22 1515.25 78.18C1558.74 86.84 1600.21 84.35 1640.66 70.68C1672.96 59.79 1709.78 43.75 1728 21.44V0H0Z" fill="#1A66FF"/>
        <path d="M0 0V5.63C215.899 59 452.29 71.32 685.195 42.57C747.115 34.93 806.486 22.45 868.954 16.11C953.914 7.48 1030.92 28.35 1107.36 51.51C1192.22 77.22 1275.84 95.24 1369.73 90C1494.33 83 1618.07 44.29 1728 5.19V0H0Z" fill="#1A66FF"/>
    </svg>
</section>
<JobListings jobs={data.jobs} />
<Benefits class="pb-[16vh]" />
<Footer />