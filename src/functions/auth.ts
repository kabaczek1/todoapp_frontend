import axios from "axios";
import config from "../config.json";
import { user } from "../setup";

export const login = async (email: string, password: string) => {
    console.log(email + " " + password);
    try {
        const res = await axios.post(`${config.backend}/login`, {
            email: email,
            password: password,
        });
        console.log(res.data);
        localStorage.setItem(
            "user",
            JSON.stringify({ name: res.data.name, email: email })
        );
        localStorage.setItem("jwt", res.data.token);
        user.name = res.data.name;
        user.email = email;
    } catch (e) {
        console.log(e);
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
    } catch (e) {
        // @ts-ignore
        output = e.response.data.message;
    }
    console.log(output);
    return output;
};
