<script setup lang="ts">
const porps = defineProps<{ text: string}>()

</script>

<template>
    <button class="bg-black text-white py-2.5 rounded-md">{{ text }}</button>
</template>