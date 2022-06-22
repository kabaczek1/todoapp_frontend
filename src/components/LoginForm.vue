<script setup lang="ts">
import { reactive } from "vue";
import { login } from "../functions/auth";
import { loginErrorMsg } from "../setup";
import Joi from "joi";
import { IUser } from "../interfaces/User";

const loginform = reactive({ email: "test@test.com", password: "Aaaaaa1!" });

const validate_login = (data: Partial<IUser>) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

const login_form_handler = async () => {
    const { error } = validate_login(loginform);
    if (error) {
        console.log(error.details);
        const output: string[] = [];
        error.details.forEach((element) => {
            output.push(element.message);
        });
        loginErrorMsg.text = output.join("<br>");
        return;
    }
    login(loginform.email, loginform.password);
};
</script>

<template>
    <div
        class="bg-indigo-100 m-4 p-4 rounded md:w-96 md:mx-auto grid gap-4 grid-cols-3 grid-rows-3"
    >
        <p class="text-2xl col-span-3 m-auto">Login</p>
        <label class="m-auto">Email</label>
        <input
            v-model="loginform.email"
            type="text"
            class="p-3 col-start-2 col-span-2 m-2 rounded"
        />
        <label class="m-auto">Password</label>
        <input
            v-model="loginform.password"
            type="password"
            class="p-3 col-start-2 col-span-2 m-2 rounded"
        />
        <button
            @click.prevent="login_form_handler()"
            class="bg-indigo-300 hover:bg-indigo-400 m-2 active:bg-indigo-500 active:shadow-lg px-2 py-3 rounded col-span-3"
        >
            Sign in
        </button>
        <p v-show="loginErrorMsg.text" class="col-span-3 text-red-400 m-auto">
            {{ loginErrorMsg.text }}
        </p>
    </div>
</template>
