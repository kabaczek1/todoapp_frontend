<script setup lang="ts">
import { user } from "./setup";
import NavBar from "./components/NavBar.vue";
import NoLogin from "./components/NoLogin.vue";
import TaskList from "./components/TaskList.vue";
import BackendOffline from "./components/BackendOffline.vue";
import Toast from "./components/Toast.vue";
import UserEdit from "./components/UserEdit.vue";
import { userEditStatus } from "./setup";
</script>

<template>
    <NavBar />
    <NoLogin v-if="user.name == '' && !userEditStatus.value" />
    <TaskList v-if="user.name != '' && !userEditStatus.value" />
    <UserEdit v-if="userEditStatus.value" />

    <Toast />
    <BackendOffline />
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
