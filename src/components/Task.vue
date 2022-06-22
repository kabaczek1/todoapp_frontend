<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ITask } from "../interfaces/Task";
const props = defineProps<{
    task: ITask;
}>();
const time_string = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
</script>

<template>
    <div class="bg-indigo-100 m-4 p-4 rounded md:w-96 md:mx-auto">
        <p class="text-xs font-extralight text-slate-500">
            {{ time_string(task.created_at) }}
        </p>
        <p class="text-3xl">{{ task.name }}</p>
        <p>{{ task.desc }}</p>
        <button>{{ task.done ? "Done" : "Not Done" }}</button>
    </div>
</template>
