<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { ITask } from "../interfaces/Task";
import {
    sendTasktoUpdate,
    deleteTask,
    updateTaskDoneStatus,
} from "../functions/task";
import { formTask } from "../setup";
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
        <p class="text-3xl" :class="{ 'text-gray-400': !task.done }">
            {{ task.name }}
        </p>
        <p :class="{ 'text-gray-400': !task.done }">{{ task.desc }}</p>
        <button
            @click.prevent="updateTaskDoneStatus(task._id)"
            class="bg-indigo-300 hover:bg-indigo-400 m-2 active:bg-indigo-500 active:shadow-lg px-2 py-1 rounded col-span-3"
        >
            {{ task.done ? "Done" : "Not Done" }}
        </button>
        <button
            @click.prevent="deleteTask(task._id)"
            class="bg-indigo-300 hover:bg-indigo-400 m-2 active:bg-indigo-500 active:shadow-lg px-2 py-1 rounded col-span-3"
        >
            Delete
        </button>
        <button
            v-show="!formTask._id"
            @click.prevent="sendTasktoUpdate(task._id)"
            class="bg-indigo-300 hover:bg-indigo-400 m-2 active:bg-indigo-500 active:shadow-lg px-2 py-1 rounded col-span-3"
        >
            Update
        </button>
    </div>
</template>
