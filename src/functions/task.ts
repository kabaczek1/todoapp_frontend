import axios from "axios";
import config from "../config.json";
import { formTask, formErrorMsg, tasks } from "../setup";
import { ITask } from "../interfaces/Task";

const sortLocalTaskArray = () => {
    tasks.sort((a: ITask, b: ITask) => {
        return b.created_at - a.created_at;
    });
};

const addTasksToLocalArray = async () => {
    let output: ITask[] = await getAllTasks();
    output.forEach((task) => {
        tasks.push(task);
    });
    sortLocalTaskArray();
};

export const mountTaskList = async () => {
    tasks.pop();
    addTasksToLocalArray();
};

export const getAllTasks = async () => {
    try {
        const res = await axios.get(`${config.backend}/task`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const sendTasktoUpdate = (id: string) => {
    const taskIndex = findTaskById(id);
    formTask._id = tasks[taskIndex]._id;
    formTask.name = tasks[taskIndex].name;
    formTask.desc = tasks[taskIndex].desc;
    formTask.done = tasks[taskIndex].done;
    tasks.splice(taskIndex, 1);
    window.scrollTo(0, 0);
};

const updateTask = async (formTask: Partial<ITask>) => {
    try {
        const res = await axios.put(`${config.backend}/task/${formTask._id}`, {
            name: formTask.name,
            desc: formTask.desc,
            done: formTask.done,
        });
        //console.log(res.data);
        tasks.push(res.data);
        sortLocalTaskArray();
    } catch (e) {
        console.log(e);
    }
};

export const cancelUpdate = async () => {
    clearForm();
    addTasksToLocalArray();
};

export const updateTaskDoneStatus = async (id: string) => {
    const taskIndex = findTaskById(id);
    try {
        const res = await axios.put(
            `${config.backend}/task/${tasks[taskIndex]._id}`,
            {
                name: tasks[taskIndex].name,
                desc: tasks[taskIndex].desc,
                done: !tasks[taskIndex].done,
            }
        );
        tasks[taskIndex].done = res.data.done;
    } catch (e) {
        console.log(e);
    }
};

const findTaskById = (id: string): number => {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]._id == id) {
            return i;
        }
    }
    return -1;
};

export const deleteTask = async (id: string) => {
    //if (!confirm("Are you sure?")) return;
    try {
        const res = await axios.delete(`${config.backend}/task/${id}`);
        if (res.data == "task deleted") {
            tasks.splice(findTaskById(id), 1);
        } else {
            console.log(res.data);
            alert("delete error");
        }
    } catch (e) {
        console.log(e);
    }
};

const addTask = async (formTask: Partial<ITask>) => {
    try {
        const res = await axios.post(`${config.backend}/task`, {
            name: formTask.name,
            desc: formTask.desc,
        });
        //console.log(res.data);
        tasks.push(res.data);
        sortLocalTaskArray();
    } catch (e) {
        console.log(e);
    }
};

export const submitForm = async (formTask: Partial<ITask>) => {
    if (!validateForm(formTask)) {
        if (formTask._id) {
            await updateTask(formTask);
        } else {
            await addTask(formTask);
        }
        clearForm();
    }
};

const validateForm = (formTask: Partial<ITask>): string => {
    let valErrors: string[] = [];
    if (formTask.name == "") valErrors.push("Name is required");
    if (formTask.desc == "") valErrors.push("Description is required");
    const validationErrorMessage = valErrors.join(", ");
    formErrorMsg.text = validationErrorMessage;
    return validationErrorMessage;
};

const clearForm = () => {
    formTask._id = "";
    formTask.name = "";
    formTask.desc = "";
    formTask.done = false;
};
