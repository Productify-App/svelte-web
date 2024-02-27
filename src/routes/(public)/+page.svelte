<script lang="ts">
	import { type Job } from '$lib/types';
	import { type ComponentType } from 'svelte';

	import Saos from 'saos';
	import { type Icon, ArrowRight, Phone, User } from 'lucide-svelte';

	import mountainPic from '$lib/deliciousmountain.png';
	import placeholder from '$lib/placeholder.png';
	import todolist from '$lib/todolist.png';

	import Footer from '$lib/components/Footer.svelte';
	import Button from '$lib/components/Button.svelte';
	import Benefits from '$lib/components/Benefits.svelte';
	import FeatureCard from './FeatureCard.svelte';
	import ScrollingJobCard from './ScrollingJobCard.svelte';

	export let data: {
		jobs: Job[];
	};

	const featureCards: {
		title: string;
		description: string;
		icon: ComponentType<Icon>;
	}[] = [
		{
			title: 'Make a difference',
			description:
				'It’s easy to set a goal. Everyone does it for themselves. The hard part is adding the action part',
			icon: Phone
		},
		{
			title: 'Challenge yourself',
			description:
				'It’s easy to set a goal. Everyone does it for themselves. The hard part is adding the action part.',
			icon: User
		},
		{
			title: 'Join Productify',
			description:
				'It’s easy to set a goal. Everyone does it for themselves. The hard part is adding the action part.',
			icon: Phone
		}
	];
</script>

<section
	style="background-image: url({mountainPic}); background-position: center; background-size: cover; width: 100vw;"
	class="-z-20 max-h-[800px] pt-20"
>
	<div class="max-w-screen-xl px-8 pb-16 mx-auto gap-24 mt-20">
		<div class="flex flex-col gap-4 shrink w-1/2">
			<Saos once={true} animation={'slide-up-small 1s cubic-bezier(0.55, 0, 0.1, 1) both'}>
				<h1 class="display-lg bold z-30 text-white">
					More than<br />
					<span class="display-lg bold text-accent-5 relative">
						just<svg
							class="absolute inline-block top-1/2 left-1/2 center fill-accent-5 opacity-15"
							width="260"
							height="160"
							viewBox="0 0 319 220"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								x="0.984131"
								y="26.5806"
								width="301.435"
								height="194"
								transform="rotate(-4.98785 0.984131 26.5806)"
							/>
						</svg>
					</span>
					a challenge...
				</h1>
			</Saos>
			<p class="text-surface-2 my-6 mr-24 font-medium">
				Welcome to Productify, a company dedicated to improving the lives of others by making
				productivity as easy as possible. Make a difference. Change lives. <strong
					>We’re hiring!</strong
				>
			</p>
			<div class="flex gap-4">
				<Button label="Learn more" color="surface" size="lg" link="#about" />
				<Button label="Apply now" class="glowing" size="lg" link="/apply" rightIcon={ArrowRight} />
			</div>
		</div>
	</div>
</section>
<section id="listings" class="bg-surface-9 py-24">
	<div class="max-w-screen-xl mx-auto pb-16">
		<Saos once={true} animation={'slide-up 1s cubic-bezier(0.55, 0, 0.1, 1) both'}>
			<h1 class="mx-8 display-sm w-full text-center text-white font-bold">Available Positions</h1>
		</Saos>
	</div>
	<div class="sliding-container w-screen">
		{#each [1, 3] as i}
			<div class="sliding-cards">
				{#each data.jobs as job}
					<ScrollingJobCard info={job} />
				{/each}
			</div>
		{/each}
	</div>
	<div class="mx-auto w-min mt-12">
		<Saos once={true} animation={'slide-up 1s cubic-bezier(0.55, 0, 0.1, 1) both'}>
			<Button
				label="View all positions"
				color="surface"
				size="lg"
				link="/jobs#listings"
				class="dark glowing"
				rightIcon={ArrowRight}
			/>
		</Saos>
	</div>
</section>
<section
	id="about"
	class="max-w-screen-xl px-8 py-16 mx-auto flex items-center justify-center gap-24"
>
	<img src={placeholder} alt="iPhone" class="w-[400px] h-[500px] object-contain ml-16" />
	<div class="flex flex-col gap-4 w-2/5">
		<div class="relative">
			<Saos once={true} animation={'slide-in 1s cubic-bezier(0.55, 0, 0.1, 1) both'}>
				<h1 class="display-md bold">
					What
					<span class="display-md bold -z-10 text-primary-5 relative">
						do
						<svg
							class="absolute inline-block -z-10 top-[43%] left-[40%] center"
							width="120"
							height="185"
							viewBox="0 0 217 185"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M149.854 0.79892L216.093 184.733L0.523304 126.971L149.854 0.79892Z"
								fill="#E5EEFF"
							/>
						</svg>
					</span>
					we do?
				</h1>
			</Saos>
			<Saos once={true} animation={'slide-up 1s cubic-bezier(0.55, 0, 0.1, 1) both 0.2s'}>
				<p class="mt-6 text-surface-8">
					Productify is a productivity app that allows users to manage their tasks through a simple
					interface. Productify allows friends to share their task with each other and uses positive
					peer pressure to encourage improvement.
				</p>
			</Saos>
		</div>
	</div>
</section>
<section class="overflow-hidden relative bg-accent-1 justify-center gap-24 -z-20">
	<div class="absolute blurbox bg-accent-2 left -z-10" />
	<div class="absolute blurbox bg-accent-2 right -z-10" />
	<div class="max-w-screen-xl px-8 py-32 mx-auto z-10">
		<Saos once={true} animation={'slide-up 1s cubic-bezier(0.55, 0, 0.1, 1) both'}>
			<h1 class="heading-2xl bold text-accent-10 w-1/3 text-center mx-auto">
				It doesn’t have to be placeholder text.
			</h1>
		</Saos>
		<div class="mx-auto grid-cols-3 grid gap-4 items-center mt-16">
			{#each featureCards as card, i}
				<Saos
					once={true}
					animation={`slide-up-big 1s cubic-bezier(0.55, 0, 0.1, 1) both ${i * 0.25}s`}
				>
					<FeatureCard title={card.title} description={card.description} icon={card.icon} />
				</Saos>
			{/each}
		</div>
	</div>
</section>
<section class="max-w-screen-xl px-8 py-24 mx-auto flex items-center justify-center gap-24">
	<div class="flex flex-col gap-4 w-1/3">
		<div class="relative">
			<Saos once={true} animation={'slide-in 1s cubic-bezier(0.55, 0, 0.1, 1) both'}>
				<h1 class="display-md bold">
					Our values and
					<span class="display-md bold -z-10 text-accent-5 relative">
						goals
						<svg
							class="absolute inline-block -z-10 top-[43%] left-[40%] center"
							width="250"
							height="130"
							viewBox="0 0 420 159"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M192.014 0.946395L419.21 100.926L0.252206 158.557L192.014 0.946395Z"
								fill="#EBFAF5"
							/>
						</svg>
					</span>
				</h1>
			</Saos>
			<Saos once={true} animation={'slide-up 1s cubic-bezier(0.55, 0, 0.1, 1) both 0.2s'}>
				<p class="mt-6 font-medium text-surface-8">
					Productify is a productivity app that allows users to manage their tasks through a simple
					interface. Productify allows friends to share their task with each other and uses positive
					peer pressure to encourage improvement.
				</p>
			</Saos>
		</div>
	</div>
	<img src={todolist} alt="iPhone" class="w-[40vw] object-contain ml-16" />
</section>
<Benefits blue />
<section class="pt-36 pb-[24vh] max-w-screen-xl mx-auto">
	<h1 class="display-md bold w-full text-center text-surface-10">Ready to get started?</h1>
	<Saos once={true} animation={'slide-up 1s cubic-bezier(0.55, 0, 0.1, 1) both'}>
		<Button
			class="glowing w-min mx-auto mt-24"
			color="accent"
			label="Join the team"
			size="lg"
			link="/jobs#top"
			rightIcon={ArrowRight}
		/>
	</Saos>
</section>
<Footer />

<style>
	.blurbox {
		width: 60vw;
		height: 40vh;
		@apply rounded-full;
		filter: blur(700px);
	}

	.blurbox.left {
		left: 10%;
		top: 50%;
		transform: translate(-50%, -50%) rotate(26deg);
	}

	.blurbox.right {
		right: -10%;
		bottom: 50%;
		transform: translate(20%, 50%) rotate(26deg);
	}

	.sliding-container {
		/*overflow-x: hidden;*/
		white-space: nowrap;
		display: flex;
		max-width: 2000px;
		margin-left: auto;
		margin-right: auto;
		padding-top: 20px;
		padding-bottom: 20px;
		mask: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
	}

	.sliding-cards {
		display: flex;
		animation: scrollAnimation 20s linear infinite;
	}

	@keyframes scrollAnimation {
		from {
			transform: translateX(0%);
		}
		to {
			transform: translateX(-100%);
		}
	}
</style>
