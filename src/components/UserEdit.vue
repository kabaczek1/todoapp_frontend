<script setup lang="ts">
import { reactive } from "vue";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { IUser } from "../interfaces/User";
import { deleteUser, update } from "../functions/auth";
import { editUserErrorMsg, toast, user } from "../setup";
import { logout } from "../functions/auth";

const edituserform = reactive({
    name: user.name,
    email: user.email,
    password: "Aaaaaa1!", //tests
    pass2: "Aaaaaa1!",
});
const clearform = () => {
    edituserform.name = "";
    edituserform.email = "";
    edituserform.password = "";
    edituserform.pass2 = "";
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

const edit_user_form_handler = async () => {
    if (!(edituserform.pass2 == edituserform.password)) {
        editUserErrorMsg.text = "Password must be the same";
        return;
    }
    const { error } = validate(edituserform);
    if (error) {
        console.log(error.details);
        const output: string[] = [];
        error.details.forEach((element) => {
            output.push(element.message);
        });
        editUserErrorMsg.text = output.join("<br>");
        return;
    }
    editUserErrorMsg.text = await update(
        edituserform.name,
        edituserform.email,
        edituserform.password
    );
    if (editUserErrorMsg.text == "User created") clearform();
};
const delete_user_form_handler = async () => {
    editUserErrorMsg.text = await deleteUser();
    if (editUserErrorMsg.text == "User deleted") {
        toast.text = "User deleted";
        logout();
    }
};
</script>

<template>
    <div
        class="bg-indigo-100 m-4 p-4 rounded md:w-96 md:mx-auto grid gap-4 grid-cols-3 grid-rows-3"
    >
        <p class="text-2xl col-span-3 m-auto">Edit</p>
        <label class="m-auto">Name</label>
        <input
            v-model="edituserform.name"
            type="text"
            class="p-3 col-start-2 col-span-2 m-2 rounded"
        />
        <label class="m-auto">Email</label>
        <input
            v-model="edituserform.email"
            type="text"
            class="p-3 col-start-2 col-span-2 m-2 rounded"
        />
        <label class="m-auto">Password</label>
        <input
            v-model="edituserform.password"
            type="password"
            class="p-3 col-start-2 col-span-2 m-2 rounded"
        />
        <label class="m-auto">Confirm Password</label>
        <input
            v-model="edituserform.pass2"
            type="password"
            class="p-3 col-start-2 col-span-2 m-2 rounded"
        />
        <button
            @click.prevent="edit_user_form_handler()"
            class="bg-indigo-300 hover:bg-indigo-400 m-2 active:bg-indigo-500 active:shadow-lg px-2 py-3 rounded col-span-3"
        >
            Update
        </button>
        <button
            @click.prevent="delete_user_form_handler()"
            class="bg-red-300 hover:bg-indigo-400 m-2 active:bg-indigo-500 active:shadow-lg px-2 py-3 rounded col-span-3"
        >
            Delete Account
        </button>
        <p
            v-show="editUserErrorMsg.text"
            class="col-span-3 text-red-400 m-auto"
            :class="{ 'text-black': editUserErrorMsg.text == 'User created' }"
        >
            {{ editUserErrorMsg.text }}
        </p>
    </div>
</template>
