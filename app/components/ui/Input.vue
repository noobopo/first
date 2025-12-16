<script setup lang="ts">
const model = defineModel({
    required: true,
})

const porps = defineProps<{ type: string, placeholder: string }>()

</script>
<template>
    <div class=" relative">
        <input v-model="model" class="w-full py-1.5 px-2 border rounded-md" :type="type" :placeholder="placeholder" />
    </div>
</template>