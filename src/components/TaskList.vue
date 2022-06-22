<script setup lang="ts">
import { onMounted } from "vue";
import Task from "./Task.vue";
import TaskForm from "./TaskForm.vue";
import { tasks } from "../setup";
import { mountTaskList } from "../functions/task";
onMounted(mountTaskList);
</script>

<template>
    <TaskForm />
    <Task v-for="task in tasks" :key="task._id" :task="task" />
</template>
