import axios from "axios";
import config from "../config.json";
import { user } from "../setup";
import { formTask } from "../setup";
import { ITask } from "../interfaces/Task";

export const updateTask = (id: string) => {
    console.log("update task ", id);
};

export const updateTaskDoneStatus = (id: string, done: boolean) => {
    console.log("update task done status ", id, done);
};

export const deleteTask = (id: string) => {
    console.log("delete task ", id);
};

const addTask = () => {
    console.log("addTask");
};

export const submitForm = (formTask: Partial<ITask>) => {
    console.log(formTask);
    clearForm();
};

const validateForm = () => {
    console.log("validateForm");
};

const clearForm = () => {
    formTask._id = "";
    formTask.name = "";
    formTask.desc = "";
};
