<template>
    <div class="h-screen w-full flex flex-col">
        <nav class="w-full flex py-2 justify-around">
            <NuxtLink to="/"><h1 class="text-3xl font-serif font-bold">LogoIpsum</h1></NuxtLink>
            <NuxtLink to="/signup"><button class="px-5 py-2 bg-black text-sm text-white rounded-md">
                    Sign Up
                </button></NuxtLink>
        </nav>
        <main class="w-full flex-1 flex justify-center items-center">
            <slot />
        </main>
    </div>
</template>
<script setup></script>
