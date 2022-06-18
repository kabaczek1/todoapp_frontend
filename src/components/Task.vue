<script setup lang="ts">
import { ITask, blankTask } from "../interfaces/Task";
const props = defineProps<{
    task: ITask;
}>();
</script>

<template>
    <div class="bg-indigo-100 m-4 p-4 rounded">
        <p class="text-2xl">{{ task.name }}</p>
        <p>{{ task.desc }}</p>
        <p>{{ task.done }}</p>
        <p>{{ task.created_at }}</p>
    </div>
</template>
