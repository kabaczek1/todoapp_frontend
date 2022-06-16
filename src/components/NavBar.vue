<script setup lang="ts">
const test = "Jacek";
</script>

<template>
    <nav class="h-16 bg-indigo-300 w-full py-4 flex flex-wrap justify-between">
        <button
            class="inline-block align-middle flex-initial hover:text-black mx-6 text-xl"
        >
            ToDoApp
        </button>
        <button
            class="inline-block align-middle flex-initial hover:text-black mx-6"
        >
            Hello, {{ test }}
        </button>
    </nav>
</template>

<style scoped></style>
