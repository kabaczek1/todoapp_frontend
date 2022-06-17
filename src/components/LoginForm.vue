<script setup lang="ts">
import axios from "axios";
import { reactive } from "vue";
import config from "../config.json";
import { user } from "../setup";

const loginform = reactive({ email: "test@test.com", password: "Aaaaaa1!" });
const login = async (
    login: string = loginform.email,
    password: string = loginform.password
) => {
    console.log(login + " " + password);
    try {
        const res = await axios.post(`${config.backend}/login`, {
            email: loginform.email,
            password: loginform.password,
        });
        console.log(res.data);
        localStorage.setItem(
            "user",
            JSON.stringify({ name: res.data.name, email: loginform.email })
        );
        localStorage.setItem("jwt", res.data.token);
        user.name = res.data.name;
        user.email = loginform.email;
    } catch (e) {
        console.log(e);
    }
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
        <button @click.prevent="login()">Sign in</button>
    </form>
</template>
