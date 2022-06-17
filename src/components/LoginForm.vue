<script setup lang="ts">
import { reactive } from "vue";
import { login } from "../functions/auth";

const loginform = reactive({ email: "test@test.com", password: "Aaaaaa1!" });

const login_form_handler = async () => {
    login(loginform.email, loginform.password);
};
</script>

<template>
    <p class="text-2xl">LoginForm</p>
    <form>
        <label>
            Email:
            <input v-model="loginform.email" type="text" /> </label
        ><br />
        <label>
            Password:
            <input v-model="loginform.password" type="password" /> </label
        ><br />
        <button @click.prevent="login_form_handler()">Sign in</button>
    </form>
</template>
