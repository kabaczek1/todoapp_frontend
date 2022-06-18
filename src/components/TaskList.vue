<script setup lang="ts">
import axios from "axios";
import config from "../config.json";
import { ITask, blankTask } from "../interfaces/Task";

import { onMounted, reactive } from "vue";
import Task from "./Task.vue";

const tasks = reactive([blankTask]);
tasks.pop();
onMounted(async () => {
    let output: ITask[] = await getTasks();
    output.forEach((task) => {
        tasks.push(task);
    });
    console.log(tasks);
});

const getTasks = async () => {
    try {
        const res = await axios.get(`${config.backend}/task`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
</script>

<template>
    <Task v-for="task in tasks" :key="task._id" :task="task" />
</template>
