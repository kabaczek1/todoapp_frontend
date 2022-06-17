<script setup lang="ts">
import { backend_status } from "../setup";
</script>

<template>
    <div
        v-if="!backend_status.value"
        class="bg-indigo-200 w-screen h-screen absolute left-0 top-0"
    >
        <div class="grid h-screen place-items-center text-3xl">
            Backend service offline :c
        </div>
    </div>
</template>
