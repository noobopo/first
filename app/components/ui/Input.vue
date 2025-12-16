<script setup lang="ts">
const model = defineModel({
    required: true,
})

const porps = defineProps<{ type: string, placeholder: string }>()

</script>
<template>
    <div class=" relative">
        <input v-model="model" class="w-full py-1.5 px-2 border rounded-md" :type="type" :placeholder="placeholder" />
        <div v-if="type ==='password'" class=" absolute top-1 right-1"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 24 24"><!-- Icon from HeroIcons by Refactoring UI Inc - https://github.com/tailwindlabs/heroicons/blob/master/LICENSE --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path d="M2.036 12.322a1 1 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178c.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178"/><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0"/></g></svg></div>
    </div>
</template>