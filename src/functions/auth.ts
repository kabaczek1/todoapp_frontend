import axios, { AxiosError } from "axios";
import config from "../config.json";
import { user } from "../setup";
import { loginErrorMsg } from "../setup";
import { userEditStatus } from "../setup";
import { tasks } from "../setup";
import { mountTaskList } from "./task";

export const logout = () => {
    userEditStatus.value = false;
    localStorage.clear();
    user.email = "";
    user.name = "";
};

export const login = async (email: string, password: string) => {
    //console.log(email + " " + password);
    try {
        const res = await axios.post(`${config.backend}/login`, {
            email: email,
            password: password,
        });
        //console.log(res.data);
        localStorage.setItem(
            "user",
            JSON.stringify({ name: res.data.name, email: email })
        );
        localStorage.setItem("jwt", res.data.token);
        user.name = res.data.name;
        user.email = email;
        mountTaskList();
    } catch (e: any) {
        console.log(e);
        loginErrorMsg.text = e.response.data.message;
    }
};

export const register = async (
    name: string,
    email: string,
    password: string
): Promise<string> => {
    let output = "";
    //console.log("register: ", name, email, password);
    try {
        const res = await axios.post(`${config.backend}/register`, {
            name: name,
            email: email,
            password: password,
        });
        output = res.data.message;
    } catch (e: any) {
        output = e.response.data.message;
    }
    //console.log(output);
    return output;
};

export const update = async (
    name: string,
    email: string,
    password: string
): Promise<string> => {
    let output = "";
    //console.log("register: ", name, email, password);
    try {
        const res = await axios.put(`${config.backend}/user`, {
            name: name,
            email: email,
            password: password,
        });
        output = res.data.message;
    } catch (e: any) {
        output = e.response.data.message;
    }
    //console.log(output);
    return output;
};

export const deleteUser = async (): Promise<string> => {
    let output = "";
    //console.log("register: ", name, email, password);
    try {
        const res = await axios.delete(`${config.backend}/user`);
        output = res.data.message;
    } catch (e: any) {
        output = e.response.data.message;
    }
    //console.log(output);
    return output;
};
