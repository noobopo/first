<template>
    <div class="h-screen w-full flex flex-col">
        <nav class="w-full flex py-2 justify-around">
            <NuxtLink to="/">
                <h1 class="text-3xl font-serif font-bold">LogoIpsum</h1>
            </NuxtLink>
            <div>
                <div v-if="token">
                    <NuxtLink to="/"><button class="px-5 py-2 bg-gray-200 text-sm rounded-md mr-5">
                            Home
                        </button></NuxtLink>
                    <NuxtLink to="/"><button class="px-5 py-2 bg-gray-200 text-sm rounded-md mr-5">
                            Create Blog
                        </button></NuxtLink>
                </div>
                <div v-else class=" space-x-5">
                    <NuxtLink to="/signup"><button class="px-5 py-2 bg-black text-sm text-white rounded-md">
                            SignUp
                        </button></NuxtLink>
                    <NuxtLink to="/login"><button class="px-5 py-2 bg-blue-500 text-sm text-white rounded-md">
                            Login
                        </button></NuxtLink>
                </div>
            </div>
        </nav>
        <main class="w-full flex-1 flex justify-center items-center">
            <slot />
        </main>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
const token = useState<string | null>("user_access", () => null);
onMounted(() => {
    token.value = localStorage.getItem("user_access");
});
</script>
