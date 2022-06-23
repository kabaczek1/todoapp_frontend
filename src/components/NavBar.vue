<script setup lang="ts">
import { user } from "../setup";
import { logout } from "../functions/auth";
import { userEditStatus } from "../setup";
</script>

<template>
    <nav class="h-16 bg-indigo-300 w-full py-4 flex flex-wrap justify-between">
        <button
            class="inline-block align-middle flex-initial mx-6 text-xl"
            @click="userEditStatus.value = false"
        >
            ToDoApp
        </button>
        <div class="inline-block align-middle flex-initial" v-show="user.name">
            <button
                class="hover:text-black mx-3 align-middle"
                @click="userEditStatus.value = !userEditStatus.value"
            >
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
