import { reactive } from "vue";
import { IUserLS } from "./interfaces/User";
import config from "./config.json";
import axios from "axios";

export const backend_status = reactive({ value: false });
try {
    const status = await axios.get(`${config.backend}/status`);
    if (status.data == "OK") backend_status.value = true;
} catch (e) {
    console.log(e);
    backend_status.value = false;
}

const LS_user = localStorage.getItem("user");
let user_data: IUserLS = { name: "", email: "" };
if (LS_user) {
    user_data = JSON.parse(LS_user);
}

export const user = reactive(user_data);
export const toast = reactive({ text: "Toast" });

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        // @ts-ignore
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});
