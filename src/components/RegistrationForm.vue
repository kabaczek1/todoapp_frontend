<script setup lang="ts">
import { reactive } from "vue";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { IUser } from "../interfaces/User";
import { register } from "../functions/auth";
import { registerErrorMsg } from "../setup";

const registerform = reactive({
    name: "Jacek",
    email: "test2@test.com",
    password: "Aaaaaa1!",
    pass2: "Aaaaaa1!",
});
const clearform = () => {
    registerform.name = "";
    registerform.email = "";
    registerform.password = "";
    registerform.pass2 = "";
};

const validate = (data: IUser) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .label("Email"),
        password: passwordComplexity().required().label("Password"),
        pass2: passwordComplexity().required().label("Confirmation"),
    });
    return schema.validate(data);
};

const register_form_handler = async () => {
    if (!(registerform.pass2 == registerform.password)) {
        registerErrorMsg.text = "Password must be the same";
        return;
    }
    const { error } = validate(registerform);
    if (error) {
        console.log(error.details);
        const output: string[] = [];
        error.details.forEach((element) => {
            output.push(element.message);
        });
        registerErrorMsg.text = output.join("<br>");
        return;
    }
    registerErrorMsg.text = await register(
        registerform.name,
        registerform.email,
        registerform.password
    );
    if (registerErrorMsg.text == "User created") clearform();
};
</script>

<template>
    <div
        class="bg-indigo-100 m-4 p-4 rounded md:w-96 md:mx-auto grid gap-4 grid-cols-3 grid-rows-3"
    >
        <p class="text-2xl col-span-3 m-auto">Register</p>
        <label class="m-auto">Name</label>
        <input
            v-model="registerform.name"
            type="text"
            class="p-3 col-start-2 col-span-2 m-2 rounded"
        />
        <label class="m-auto">Email</label>
        <input
            v-model="registerform.email"
            type="text"
            class="p-3 col-start-2 col-span-2 m-2 rounded"
        />
        <label class="m-auto">Password</label>
        <input
            v-model="registerform.password"
            type="password"
            class="p-3 col-start-2 col-span-2 m-2 rounded"
        />
        <label class="m-auto">Confirm Password</label>
        <input
            v-model="registerform.pass2"
            type="password"
            class="p-3 col-start-2 col-span-2 m-2 rounded"
        />
        <button
            @click.prevent="register_form_handler()"
            class="bg-indigo-300 hover:bg-indigo-400 m-2 active:bg-indigo-500 active:shadow-lg px-2 py-3 rounded col-span-3"
        >
            Register
        </button>
        <p
            v-show="registerErrorMsg.text"
            class="col-span-3 text-red-400 m-auto"
            :class="{ 'text-black': registerErrorMsg.text == 'User created' }"
        >
            {{ registerErrorMsg.text }}
        </p>
    </div>
</template>
