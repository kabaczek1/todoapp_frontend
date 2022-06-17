<script setup lang="ts">
import { user } from "./setup";
import NavBar from "./components/NavBar.vue";
import NoLogin from "./components/NoLogin.vue";
import TaskList from "./components/TaskList.vue";
</script>

<template>
    <NavBar />
    <NoLogin v-if="user.name == ''" />
    <TaskList v-if="user.name != ''" />
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
}
</style>
