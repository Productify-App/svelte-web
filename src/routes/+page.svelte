<script>
    import Button from "../components/Button.svelte";

    import phonePic from "$lib/IPhone_4S_No_shadow.png";
</script>

<nav class="flex items-center max-w-screen-xl px-8 mx-auto w-screen py-5 justify-between">
    <h1 class="font-semibold">Productify</h1>

    <Button label="Submit an application" link="/application/submit" />
</nav>
<body>
<section class="max-w-screen-xl px-8 py-4 mx-auto flex items-center justify-center gap-24">
    <div class="flex flex-col gap-4 w-[600px]">
        <div class="relative">
            <h1 class="display-lg bold">More than <span class="display-lg bold -z-10 text-accent-5 relative"><svg class="absolute inline-block -z-10 top-1/2 left-1/2 center" width="220" height="140" viewBox="0 0 319 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.984131" y="26.5806" width="301.435" height="194" transform="rotate(-4.98785 0.984131 26.5806)" fill="#EBFAF5"/>
            </svg>just</span></h1>
            <h1 class="display-lg bold whitespace-nowrap">a challenge...</h1>
        </div>
        <p class="text-xl text-surface-8 my-6 w-4/5 font-medium">
            Welcome to Productify, a company dedicated to improving the lives of others by making productivity as easy as possible. Make a difference. Change lives. <strong>We’re hiring!</strong>
        </p>
        <div class="flex gap-4">
            <Button label="Learn more" color="surface" outlined size="lg" link="/application/submit" />
            <Button label="What's available?" size="lg" link="/application/submit">
                <div slot="icon right">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </div>
            </Button>
        </div>
    </div>
    <img src={phonePic} alt="iPhone" class="w-[300px] h-[600px] object-contain rotate-6" />
</section>
<section class="max-w-screen-xl px-8 py-4 mx-auto flex items-center justify-center gap-24">
    <img src={phonePic} alt="iPhone" class="w-[300px] h-[600px] object-contain rotate-6" />
    <div class="flex flex-col gap-4 w-[600px]">
        <div class="relative">
            <h1 class="display-md">What do we do?</h1>
        </div>
    </div>
</section>
</body>
