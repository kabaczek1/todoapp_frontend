<script setup lang="ts">
import { reactive } from "vue";
import { register } from "../functions/auth";
import { toast } from "../setup";

const registerform = reactive({
    name: "Jacek",
    email: "test2@test.com",
    password: "Aaaaaa1!",
});
const clearform = () => {
    registerform.name = "";
    registerform.email = "";
    registerform.password = "";
};

const register_form_handler = async () => {
    toast.text = await register(
        registerform.name,
        registerform.email,
        registerform.password
    );
    if (toast.text == "User created") clearform();
};
</script>

<template>
    <p class="text-2xl">RegisterForm</p>
    <form>
        <label>
            Name:
            <input v-model="registerform.name" type="text" /> </label
        ><br />
        <label>
            Email:
            <input v-model="registerform.email" type="text" /> </label
        ><br />
        <label>
            Password:
            <input v-model="registerform.password" type="password" /> </label
        ><br />
        <button @click.prevent="register_form_handler()">Sign in</button>
    </form>
</template>
