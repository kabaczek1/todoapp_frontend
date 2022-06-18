export interface ITask {
    _id: string;
    author: string;
    name: string;
    desc: string;
    done: boolean;
    created_at: number;
    subtasks: [];
    __v: number;
}

export const blankTask: ITask = {
    _id: "",
    author: "",
    name: "",
    desc: "",
    done: false,
    created_at: 0,
    subtasks: [],
    __v: 0,
};
