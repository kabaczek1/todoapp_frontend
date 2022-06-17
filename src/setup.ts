import { reactive, ref } from "vue";
import { IUserLS } from "./interfaces/User";

const LS_user = localStorage.getItem("user");
//console.log(LS_user);
let user_data: IUserLS = { name: "", email: "" };
if (LS_user) {
    user_data = JSON.parse(LS_user);
}
//console.log(user_data);

export const user = reactive(user_data);
