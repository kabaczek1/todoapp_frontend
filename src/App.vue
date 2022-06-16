<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
import NavBar from "./components/NavBar.vue";
import { user } from "./setup";
import RegistrationForm from "./components/RegistrationForm.vue";
import LoginForm from "./components/LoginForm.vue";
import TaskList from "./components/TaskList.vue";
</script>

<template>
    <NavBar />
    <div v-if="user.name == ''">
        <LoginForm />
        <RegistrationForm />
    </div>
    <div v-if="user.name != ''">
        <TaskList />
    </div>
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
