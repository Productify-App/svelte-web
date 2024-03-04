<script lang="ts">
	import { type Job } from '$lib/types';
	import { onMount } from 'svelte';
	import { ArrowLeft, ArrowRight, CheckIcon } from 'lucide-svelte';

	import Divider from '$lib/components/Divider.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Button from '$lib/components/Button.svelte';
	import Section from './Section.svelte';
	import Saos from 'saos';
	import type { DBJob } from '$lib/types.js';

	export let data: {
		job: DBJob;
	} = { job: null };

	onMount(() => {
		console.log(data.job);
	});
</script>

{#if !data.job}
	<div class="flex justify-center items-center h-screen bg-primary-5">
		<div class="flex flex-col gap-4 items-center">
			<h1 class="display-lg text-center text-primary-9 drop-shadow-xl">Job not found</h1>
			<Button
				label="Go back to job listings"
				color="surface"
				class="w-min"
				leftIcon={ArrowLeft}
				link="/jobs"
			/>
		</div>
	</div>
{:else}
	<section id="top" class="-z-20 max-h-[800px] pt-20 bg-primary-5">
		<div class="max-w-screen-md px-8 pb-8 mx-auto gap-24 pt-20">
			<div class="flex flex-col gap-4 shrink">
				<h1 class="display-md z-30 text-white mx-auto w-full">
					{data.job.title}
				</h1>
				<h1 class="text-lg font-bold z-30 text-primary-2 mx-auto w-full">
					{data.job.expand.locations
						.map((loc) => loc.location)
						.join(' OR ')
						.toUpperCase()}
				</h1>
			</div>
		</div>
		<svg
			class="w-screen bg-white"
			viewBox="0 0 1728 111"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1265.2 56.44C1181.68 45.65 1100.81 26.31 1017.52 14.58C898.877 -2.14 775.325 -3.15 656.87 14.19C541.757 31 422.395 72 308.65 92.83C207.778 111.31 97.6464 118.92 -0.00012207 95.83V0H1728V27.35C1580.45 66.2042 1420.4 76.2645 1265.2 56.44Z"
				fill="#1A66FF"
			/>
		</svg>
	</section>
	<section class="max-w-screen-md mx-auto px-8 py-10 mb-[17vh]">
		<div class="flex gap-2 mb-8">
			{#each data.job.expand.tags.map((tag) => tag.tag) as tag}
				<div class="px-4 py-2 border-2 border-surface-5 rounded-full">
					<p class="text-surface-6">{tag}</p>
				</div>
			{/each}
		</div>
		<Divider />
		<Section title="Overview" content={data.job.info.overview} />
		<Divider />
		<Section title="Expectations" content={data.job.info.expectations} />
		<Divider />
		<h1 class="text-xl font-semibold text-surface-9 mt-8">What we're looking for</h1>
		<ul class="space-y-2 mt-4 mb-8">
			{#each data.job.info.requirements as requirement, i}
				<Saos once={true} animation={`slide-in 1s cubic-bezier(0.55, 0, 0.1, 1) both`}>
					<li class="text-surface-7 flex gap-2 ml-2">
						<p class="inline-block select-none">
							<CheckIcon class="text-accent-5" />
						</p>
						<p class="inline-block">{requirement}</p>
					</li>
				</Saos>
			{/each}
		</ul>
		<Divider />
		<h1 class="text-xl font-semibold text-surface-9 mt-8">Salary</h1>
		<ul class="space-y-2 mt-4 mb-8">
			{#each data.job.info.salary as salaryPt, i}
				<Saos once={true} animation={`slide-in 1s cubic-bezier(0.55, 0, 0.1, 1) both`}>
					<li class="text-surface-7 flex gap-2 ml-2">
						<p class="inline-block select-none">
							<CheckIcon class="text-accent-5" />
						</p>
						<p class="inline-block">{salaryPt}</p>
					</li>
				</Saos>
			{/each}
		</ul>
		<div class="w-full">
			<Saos once={true} animation={'slide-up-small 1s cubic-bezier(0.55, 0, 0.1, 1) both'}>
				<Button
					label="Apply for this position"
					color="accent"
					arrowRight={ArrowRight}
					class="mx-auto w-min"
					size="lg"
					redirectOptions={{
						replaceState: true,
						invalidateAll: true
					}}
					link={'/apply?id=' + data.job.id}
				/>
			</Saos>
		</div>
	</section>
	<Footer />
{/if}
