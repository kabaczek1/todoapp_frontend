<script setup lang="ts">
import { formTask } from "../setup";
import { submitForm } from "../functions/task";
</script>

<template>
    <div
        class="bg-indigo-100 m-4 p-4 rounded md:w-96 md:mx-auto grid gap-4 grid-cols-3 grid-rows-3"
    >
        <label class="m-auto"> Name </label>
        <input
            class="p-3 col-start-2 col-span-2 m-2 rounded"
            type="text"
            v-model="formTask.name"
        />
        <label class="m-auto"> Description </label>
        <input
            class="p-3 col-start-2 col-span-2 m-2 rounded"
            type="text"
            v-model="formTask.desc"
        />
        <button
            @click.prevent="submitForm(formTask)"
            class="bg-indigo-300 hover:bg-indigo-400 m-2 active:bg-indigo-500 active:shadow-lg px-2 py-1 rounded col-span-3"
        >
            {{ formTask._id ? "Update" : "Add" }} task
        </button>
    </div>
</template>
