<script>
    import Button from "$lib/components/Button.svelte";

    import phonePic from "$lib/iphone.png";
    import placeholder from "$lib/placeholder.png";
    import FeatureCard from "$lib/components/FeatureCard.svelte";
</script>

<style>
    .blurbox {
        width: 60vw;
        height: 40vh;
        @apply bg-accent-2;
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
</style>

<body>
<section class="max-w-screen-xl px-8 pb-16 mx-auto flex items-center justify-center gap-24">
    <div class="flex flex-col gap-4">
            <h1 class="display-lg bold">
                More than<br />
                <span class="display-lg bold -z-10 text-accent-5 relative">
                    just
                    <svg class="absolute inline-block -z-10 top-1/2 left-1/2 center" width="300" height="150" viewBox="0 0 319 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.984131" y="26.5806" width="301.435" height="194" transform="rotate(-4.98785 0.984131 26.5806)" fill="#EBFAF5"/>
                    </svg>
                </span>
                a challenge...
            </h1>
        <p class="text-xl text-surface-8 my-6 mr-24 font-medium">
            Welcome to Productify, a company dedicated to improving the lives of others by making productivity as easy as possible. Make a difference. Change lives. <strong>We’re hiring!</strong>
        </p>
        <div class="flex gap-4">
            <Button label="Apply now" color="surface" outlined size="lg" link="#" />
            <Button label="What's available?" size="lg" link="#" >
                <div slot="icon right">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </div>
            </Button>
        </div>
    </div>
    <img src={phonePic} alt="iPhone" class="w-[800px] h-[700px] object-contain rotate-6 mr-16" />
</section>
<section class="max-w-screen-xl px-8 py-16 mx-auto flex items-center justify-center gap-24">
    <img src={placeholder} alt="iPhone" class="w-[500px] h-[600px] object-contain ml-16" />
    <div class="flex flex-col gap-4 w-1/3">
        <div class="relative">
            <h1 class="display-md bold">What
                <span class="display-md bold -z-10 text-primary-5 relative">
                    do
                    <svg class="absolute inline-block -z-10 top-[43%] left-[40%] center" width="120" height="185" viewBox="0 0 217 185" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M149.854 0.79892L216.093 184.733L0.523304 126.971L149.854 0.79892Z" fill="#E5EEFF"/>
                    </svg>
                </span>
                we do?</h1>
            <p class="mt-6">
                Productify is a productivity app that allows users to manage their tasks through a simple interface. Productify allows friends to share their task with each other and uses positive peer pressure to encourage improvement.
            </p>
        </div>
    </div>
</section>
<section class="overflow-hidden relative bg-accent-1 justify-center gap-24 -z-20">
    <div class="absolute blurbox left -z-10" />
    <div class="absolute blurbox right -z-10" />
    <div class="max-w-screen-xl px-8 py-32 mx-auto z-10">
        <h1 class="heading-2xl bold text-accent-10 w-1/3 text-center mx-auto">
            It doesn’t have be to placeholder text.
        </h1>
        <div class="mx-auto flex gap-4 items-center mt-16">
            <FeatureCard title="Make a difference" description="It’s easy to set a goal. Everyone does it for themselves. The hard part is adding the action part. Blah blah blah blah" >
                <div slot="icon">
                    <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M52 39V65M64.875 52H39.125M90.625 52C90.625 57.1216 89.6259 62.193 87.6848 66.9247C85.7438 71.6564 82.8987 75.9557 79.312 79.5772C75.7253 83.1986 71.4673 86.0714 66.7811 88.0313C62.0949 89.9912 57.0723 91 52 91C46.9277 91 41.9051 89.9912 37.2189 88.0313C32.5327 86.0714 28.2747 83.1986 24.688 79.5772C21.1013 75.9557 18.2562 71.6564 16.3152 66.9247C14.3741 62.193 13.375 57.1216 13.375 52C13.375 41.6566 17.4444 31.7368 24.688 24.4228C31.9316 17.1089 41.756 13 52 13C62.244 13 72.0684 17.1089 79.312 24.4228C86.5556 31.7368 90.625 41.6566 90.625 52Z" stroke="#4BCEA4" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </FeatureCard>
            <FeatureCard title="Join Productify" description="It’s easy to set a goal. Everyone does it for themselves. The hard part is adding the action part. Blah blah blah blah" >
                <div slot="icon">
                    <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M52 39V65M64.875 52H39.125M90.625 52C90.625 57.1216 89.6259 62.193 87.6848 66.9247C85.7438 71.6564 82.8987 75.9557 79.312 79.5772C75.7253 83.1986 71.4673 86.0714 66.7811 88.0313C62.0949 89.9912 57.0723 91 52 91C46.9277 91 41.9051 89.9912 37.2189 88.0313C32.5327 86.0714 28.2747 83.1986 24.688 79.5772C21.1013 75.9557 18.2562 71.6564 16.3152 66.9247C14.3741 62.193 13.375 57.1216 13.375 52C13.375 41.6566 17.4444 31.7368 24.688 24.4228C31.9316 17.1089 41.756 13 52 13C62.244 13 72.0684 17.1089 79.312 24.4228C86.5556 31.7368 90.625 41.6566 90.625 52Z" stroke="#4BCEA4" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </FeatureCard>
            <FeatureCard title="Challenge yourself" description="It’s easy to set a goal. Everyone does it for themselves. The hard part is adding the action part. Blah blah blah blah" >
                <div slot="icon">
                    <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M52 39V65M64.875 52H39.125M90.625 52C90.625 57.1216 89.6259 62.193 87.6848 66.9247C85.7438 71.6564 82.8987 75.9557 79.312 79.5772C75.7253 83.1986 71.4673 86.0714 66.7811 88.0313C62.0949 89.9912 57.0723 91 52 91C46.9277 91 41.9051 89.9912 37.2189 88.0313C32.5327 86.0714 28.2747 83.1986 24.688 79.5772C21.1013 75.9557 18.2562 71.6564 16.3152 66.9247C14.3741 62.193 13.375 57.1216 13.375 52C13.375 41.6566 17.4444 31.7368 24.688 24.4228C31.9316 17.1089 41.756 13 52 13C62.244 13 72.0684 17.1089 79.312 24.4228C86.5556 31.7368 90.625 41.6566 90.625 52Z" stroke="#4BCEA4" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </FeatureCard>
        </div>
    </div>
</section>

<section class="my-96 justify-center gap-24">
</section>
</body>
