<script setup lang="ts">
import { toast } from "../setup";
const dismissToast = () => {
    toast.text = "";
};
</script>

<template>
    <div
        v-if="toast.text"
        class="bg-indigo-100 rounded-xl h-12 w-64 text-start p-2 m-4 flex items-center absolute bottom-0 shadow-lg"
    >
        <div class="ml-3 text-sm font-normal">
            {{ toast.text }}
        </div>
        <button
            @click="dismissToast()"
            type="button"
            class="ml-auto bg-indigo-200 hover:bg-indigo-300 text-gray-500 hover:text-gray-700 rounded-lg p-1.5 h-8 w-8 grid place-content-center"
        >
            <div class="">x</div>
        </button>
    </div>
</template>
