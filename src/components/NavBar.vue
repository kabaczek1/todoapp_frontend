<script setup lang="ts">
import { user } from "../setup";
const logout = () => {
    localStorage.clear();
    user.email = "";
    user.name = "";
};
</script>

<template>
    <nav class="h-16 bg-indigo-300 w-full py-4 flex flex-wrap justify-between">
        <button
            class="inline-block align-middle flex-initial hover:text-black mx-6 text-xl"
        >
            ToDoApp
        </button>
        <div class="inline-block align-middle flex-initial" v-show="user.name">
            <button class="hover:text-black mx-3 align-middle">
                Hello, {{ user.name }}
            </button>
            <button
                @click="logout"
                class="hover:text-black mx-3 mr-6 align-middle"
            >
                Logout
            </button>
        </div>
    </nav>
</template>

<style scoped></style>
